export const messageHandler = {
  formatMessage(role, content, reasoning_content = '', files = []) {
    return {
      id: Date.now(),
      role,
      content,
      reasoning_content,
      files,
      completion_tokens: 0,
      speed: 0,
      loading: false,
    }
  },

  // 处理流式响应
  async handleStreamResponse(response, updateCallback) {
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let accumulatedContent = ''
    let accumulatedReasoning = ''
    let startTime = Date.now()
    
    // 批量更新相关变量
    let batchUpdateTimer = null
    let lastUpdateTime = Date.now()
    const BATCH_UPDATE_INTERVAL = 100 // 100ms批量更新间隔
    
    // 批量更新函数
    const performBatchUpdate = (tokens = 0) => {
      const currentTime = Date.now()
      const speed = tokens > 0 ? (tokens / ((currentTime - startTime) / 1000)).toFixed(2) : '0.00'
      
      updateCallback(
        accumulatedContent,
        accumulatedReasoning,
        tokens,
        speed
      )
      lastUpdateTime = currentTime
    }

    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        // 流结束时，清除定时器并执行最后一次更新
        if (batchUpdateTimer) {
          clearTimeout(batchUpdateTimer)
          batchUpdateTimer = null
        }
        // 执行最终更新，确保所有内容都显示
        performBatchUpdate()
        break
      }

      const chunk = decoder.decode(value)
      const lines = chunk.split('\n').filter((line) => line.trim() !== '')

      for (const line of lines) {
        if (line === 'data: [DONE]') continue
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(5))
          const content = data.choices[0].delta.content || ''
          const reasoning = data.choices[0].delta.reasoning_content || ''

          accumulatedContent += content
          accumulatedReasoning += reasoning

          // 使用时间分片策略：只有当距离上次更新超过100ms时才更新UI
          const currentTime = Date.now()
          if (currentTime - lastUpdateTime >= BATCH_UPDATE_INTERVAL) {
            // 立即更新
            performBatchUpdate(data.usage?.completion_tokens || 0)
            
            // 清除之前的定时器
            if (batchUpdateTimer) {
              clearTimeout(batchUpdateTimer)
              batchUpdateTimer = null
            }
          } else {
            // 设置延迟更新，确保在间隔时间后更新
            if (!batchUpdateTimer) {
              const remainingTime = BATCH_UPDATE_INTERVAL - (currentTime - lastUpdateTime)
              batchUpdateTimer = setTimeout(() => {
                performBatchUpdate(data.usage?.completion_tokens || 0)
                batchUpdateTimer = null
              }, remainingTime)
            }
          }
        }
      }
    }
  },

  // 处理非流式响应
  handleNormalResponse(response, updateCallback) {
    updateCallback(
      response.choices[0].message.content,
      response.choices[0].message.reasoning_content || '',
      response.usage.completion_tokens,
      response.speed,
    )
  },

  // 统一的响应处理函数
  async handleResponse(response, isStream, updateCallback) {
    if (isStream) {
      await this.handleStreamResponse(response, updateCallback)
    } else {
      this.handleNormalResponse(response, updateCallback)
    }
  },
}
