<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Search, Cpu, Lightning, Monitor, Star, ArrowRight } from '@element-plus/icons-vue'
import SearchDialog from '@/components/SearchDialog.vue'

const showSearchDialog = ref(false)

// 特色功能列表
const features = ref([
  {
    icon: Lightning,
    title: '极速响应',
    description: '毫秒级响应速度，流式输出让对话更自然',
    color: '#FFD700'
  },
  {
    icon: Cpu,
    title: '多模型支持',
    description: '支持DeepSeek、Qwen-2.5、glm-4等多种先进AI模型',
    color: '#00CED1'
  },
  {
    icon: Monitor,
    title: '深色主题',
    description: '精美的深色模式，保护您的眼睛，提升使用体验',
    color: '#9370DB'
  },
  {
    icon: Star,
    title: '智能对话',
    description: '上下文理解，记忆对话历史，提供连贯的交流体验',
    color: '#FF6B6B'
  }
])

// 处理搜索框点击
const handleSearchClick = () => {
  showSearchDialog.value = true
}

// 滚动到功能区域
const scrollToFeatures = () => {
  const featuresSection = document.getElementById('features')
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: 'smooth' })
  }
}

// 处理键盘事件
const handleKeydown = (event) => {
  // Ctrl+K 或 Cmd+K 打开搜索
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault()
    showSearchDialog.value = true
  }
}

// 添加点击遮罩层关闭对话框的处理
const handleOverlayClick = (event) => {
  // 只有当点击的是遮罩层本身时才关闭对话框
  if (event.target.classList.contains('search-dialog-overlay')) {
    showSearchDialog.value = false
  }
}

// 处理点击外部关闭对话框
const handleClickOutside = (event) => {
  const searchDialog = document.querySelector('.search-dialog')
  if (
    searchDialog &&
    !searchDialog.contains(event.target) &&
    !event.target.closest('.search-box')
  ) {
    showSearchDialog.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-brand">
          <span class="brand-icon">🚀</span>
          <span class="brand-text">AI智聊</span>
        </div>
        <div class="nav-actions">
          <div class="search-box" @click="handleSearchClick">
            <el-icon class="search-icon"><Search /></el-icon>
            <span class="search-placeholder">快速搜索...</span>
            <kbd class="kbd">Ctrl+K</kbd>
          </div>
          <a href="https://github.com/huanz1234/felix-lml-chat" target="_blank" class="github-btn">
            <img src="@/assets/photo/github.png" alt="GitHub" class="github-icon" />
          </a>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <main class="main-container">
      <!-- 英雄区域 -->
      <section class="hero-area">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-text">✨ 全新AI对话体验</span>
          </div>
          <h1 class="hero-title">
            与AI智能助手
            <span class="gradient-text">开启对话</span>
          </h1>
          <p class="hero-subtitle">
            体验下一代人工智能对话系统，支持多种大语言模型，
            <br />为您提供专业、智能、高效的AI助手服务
          </p>
          
          <!-- CTA按钮组 -->
          <div class="cta-group">
            <router-link to="/chat" class="primary-btn">
              <span class="btn-text">立即开始</span>
              <el-icon class="btn-icon"><ArrowRight /></el-icon>
            </router-link>
            <button class="secondary-btn" @click="scrollToFeatures">
              <span>了解更多</span>
            </button>
          </div>

          <!-- 统计数据 -->
          <div class="stats-row">
            <div class="stat-item">
              <div class="stat-number">7+</div>
              <div class="stat-label">AI模型</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">24/7</div>
              <div class="stat-label">在线服务</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">∞</div>
              <div class="stat-label">对话次数</div>
            </div>
          </div>
        </div>
        
        <!-- 背景装饰 -->
        <div class="hero-decoration">
          <div class="floating-card card-1">
            <div class="card-content">
              <div class="card-icon">💡</div>
              <div class="card-text">智能问答</div>
            </div>
          </div>
          <div class="floating-card card-2">
            <div class="card-content">
              <div class="card-icon">⚡</div>
              <div class="card-text">极速响应</div>
            </div>
          </div>
          <div class="floating-card card-3">
            <div class="card-content">
              <div class="card-icon">🎨</div>
              <div class="card-text">深色主题</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 特色功能区域 -->
      <section class="features-section" id="features">
        <div class="section-header">
          <h2 class="section-title">核心特色</h2>
          <p class="section-subtitle">为什么选择我们的AI助手？</p>
        </div>
        
        <div class="features-grid">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="feature-card"
            :style="{ '--delay': index * 0.1 + 's' }"
          >
            <div class="feature-icon-wrapper" :style="{ '--color': feature.color }">
              <el-icon class="feature-icon">
                <component :is="feature.icon" />
              </el-icon>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <!-- 底部CTA -->
      <section class="bottom-cta">
        <div class="cta-content">
          <h2 class="cta-title">准备好开始了吗？</h2>
          <p class="cta-subtitle">立即体验智能AI对话，开启您的AI助手之旅</p>
          <router-link to="/chat" class="cta-button">
            <span>开始对话</span>
            <div class="button-glow"></div>
          </router-link>
        </div>
      </section>
    </main>

    <!-- 搜索对话框 -->
    <Transition name="fade">
      <div v-if="showSearchDialog" class="search-dialog-overlay" @click="handleOverlayClick">
        <div class="search-dialog-container" @click.stop>
          <SearchDialog />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
  background: var(--bg-color);
  overflow-x: hidden;
}

// 导航栏样式
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: rgba(var(--bg-color-rgb), 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-color);
  
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .nav-brand {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .brand-icon {
      font-size: 24px;
      animation: float 3s ease-in-out infinite;
    }
    
    .brand-text {
      font-size: 24px;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
  }
  
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .search-box {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    background: var(--code-header-bg);
    border: 1px solid var(--border-color);
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 200px;
    
    &:hover {
      border-color: var(--el-color-primary);
      box-shadow: 0 0 0 3px rgba(103, 126, 234, 0.1);
    }
    
    .search-icon {
      color: var(--text-color-secondary);
      font-size: 16px;
    }
    
    .search-placeholder {
      flex: 1;
      color: var(--text-color-secondary);
      font-size: 14px;
    }
    
    .kbd {
      background: var(--bg-color);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 12px;
      color: var(--text-color-secondary);
    }
  }
  
  .github-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--code-header-bg);
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    .github-icon {
      width: 20px;
      height: 20px;
    }
  }
}

// 主容器
.main-container {
  padding-top: 70px;
}

// 英雄区域
.hero-area {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  background: linear-gradient(135deg, 
    rgba(103, 126, 234, 0.05) 0%, 
    rgba(118, 75, 162, 0.05) 100%);
  
  .hero-content {
    text-align: center;
    max-width: 800px;
    z-index: 2;
  }
  
  .hero-badge {
    display: inline-block;
    padding: 8px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50px;
    margin-bottom: 32px;
    animation: fadeInUp 0.8s ease-out;
    
    .badge-text {
      color: white;
      font-size: 14px;
      font-weight: 600;
    }
  }
  
  .hero-title {
    font-size: clamp(36px, 5vw, 64px);
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 24px;
    color: var(--text-color-primary);
    animation: fadeInUp 0.8s ease-out 0.2s both;
    
    .gradient-text {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
    }
  }
  
  .hero-subtitle {
    font-size: 20px;
    line-height: 1.6;
    color: var(--text-color-secondary);
    margin-bottom: 48px;
    animation: fadeInUp 0.8s ease-out 0.4s both;
  }
  
  .cta-group {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-bottom: 64px;
    animation: fadeInUp 0.8s ease-out 0.6s both;
    flex-wrap: wrap;
  }
  
  .primary-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 32px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    transition: all 0.3s ease;
    box-shadow: 0 8px 32px rgba(103, 126, 234, 0.3);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 40px rgba(103, 126, 234, 0.4);
    }
    
    .btn-icon {
      transition: transform 0.3s ease;
    }
    
    &:hover .btn-icon {
      transform: translateX(4px);
    }
  }
  
  .secondary-btn {
    padding: 16px 32px;
    background: transparent;
    color: var(--text-color-primary);
    border: 2px solid var(--border-color);
    border-radius: 50px;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: var(--el-color-primary);
      color: var(--el-color-primary);
      transform: translateY(-2px);
    }
  }
  
  .stats-row {
    display: flex;
    justify-content: center;
    gap: 64px;
    animation: fadeInUp 0.8s ease-out 0.8s both;
    flex-wrap: wrap;
    
    .stat-item {
      text-align: center;
      
      .stat-number {
        font-size: 32px;
        font-weight: 800;
        color: var(--el-color-primary);
        margin-bottom: 8px;
      }
      
      .stat-label {
        font-size: 14px;
        color: var(--text-color-secondary);
        font-weight: 500;
      }
    }
  }
  
  // 浮动卡片装饰
  .hero-decoration {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    
    .floating-card {
      position: absolute;
      background: var(--bg-color);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 20px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
      
      .card-content {
        display: flex;
        align-items: center;
        gap: 12px;
        
        .card-icon {
          font-size: 24px;
        }
        
        .card-text {
          font-weight: 600;
          color: var(--text-color-primary);
          font-size: 14px;
        }
      }
      
      &.card-1 {
        top: 20%;
        left: 10%;
        animation: float 6s ease-in-out infinite;
      }
      
      &.card-2 {
        top: 30%;
        right: 15%;
        animation: float 6s ease-in-out infinite 2s;
      }
      
      &.card-3 {
        bottom: 25%;
        left: 15%;
        animation: float 6s ease-in-out infinite 4s;
      }
    }
  }
}

// 特色功能区域
.features-section {
  padding: 120px 24px;
  max-width: 1200px;
  margin: 0 auto;
  
  .section-header {
    text-align: center;
    margin-bottom: 80px;
    
    .section-title {
      font-size: 48px;
      font-weight: 800;
      color: var(--text-color-primary);
      margin-bottom: 16px;
    }
    
    .section-subtitle {
      font-size: 20px;
      color: var(--text-color-secondary);
    }
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 32px;
    
    .feature-card {
      padding: 40px 32px;
      background: var(--bg-color);
      border: 1px solid var(--border-color);
      border-radius: 20px;
      text-align: center;
      transition: all 0.3s ease;
      animation: fadeInUp 0.6s ease-out var(--delay) both;
      
      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        border-color: var(--el-color-primary-light-7);
      }
      
      .feature-icon-wrapper {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--color), transparent);
        margin-bottom: 24px;
        
        .feature-icon {
          font-size: 32px;
          color: var(--color);
        }
      }
      
      .feature-title {
        font-size: 24px;
        font-weight: 700;
        color: var(--text-color-primary);
        margin-bottom: 16px;
      }
      
      .feature-desc {
        font-size: 16px;
        line-height: 1.6;
        color: var(--text-color-secondary);
      }
    }
  }
}

// 底部CTA
.bottom-cta {
  padding: 120px 24px;
  background: linear-gradient(135deg, 
    rgba(103, 126, 234, 0.05) 0%, 
    rgba(118, 75, 162, 0.05) 100%);
  
  .cta-content {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    
    .cta-title {
      font-size: 48px;
      font-weight: 800;
      color: var(--text-color-primary);
      margin-bottom: 24px;
    }
    
    .cta-subtitle {
      font-size: 20px;
      color: var(--text-color-secondary);
      margin-bottom: 48px;
      line-height: 1.6;
    }
    
    .cta-button {
      position: relative;
      display: inline-block;
      padding: 20px 48px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      font-size: 18px;
      transition: all 0.3s ease;
      overflow: hidden;
      
      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 50px rgba(103, 126, 234, 0.4);
      }
      
      .button-glow {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.5s ease;
      }
      
      &:hover .button-glow {
        left: 100%;
      }
      
      span {
        position: relative;
        z-index: 1;
      }
    }
  }
}

// 搜索对话框
.search-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(8px);
}

.search-dialog-container {
  margin-top: 15vh;
  width: 640px;
  max-width: 90vw;
}

// 动画
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 响应式设计
@media (max-width: 768px) {
  .navbar .nav-container {
    padding: 0 16px;
  }
  
  .hero-area {
    min-height: 80vh;
    padding: 0 16px;
  }
  
  .cta-group {
    flex-direction: column;
    align-items: center;
  }
  
  .stats-row {
    gap: 32px;
  }
  
  .features-section {
    padding: 80px 16px;
  }
  
  .bottom-cta {
    padding: 80px 16px;
  }
  
  .search-box {
    min-width: 150px;
  }
}
</style>
