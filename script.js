// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
});

// 点击菜单项后关闭移动端菜单
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    navMenu.classList.remove('active');
}));

// 懒加载图片
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// 景点卡片悬停效果
const attractionCards = document.querySelectorAll('.attraction-card');
attractionCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// 天气小部件功能
function updateWeather() {
    // 模拟天气数据更新
    const tempElement = document.getElementById('weather-temp');
    const descElement = document.getElementById('weather-desc');
    
    // 这里应该是实际的API调用，暂时模拟数据
    const temps = ['25°C', '26°C', '27°C', '28°C', '29°C', '30°C'];
    const descs = ['晴朗', '多云', '晴间多云', '晴朗', '晴朗'];
    
    const randomTemp = temps[Math.floor(Math.random() * temps.length)];
    const randomDesc = descs[Math.floor(Math.random() * descs.length)];
    
    tempElement.textContent = randomTemp;
    descElement.textContent = randomDesc;
}

// 每分钟更新一次天气（模拟）
setInterval(updateWeather, 60000);
// 初始加载时更新一次
updateWeather();

// 货币转换器功能
function setupCurrencyConverter() {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const convertedAmount = document.getElementById('convertedAmount');
    
    // 汇率数据（模拟数据，实际应该从API获取）
    const exchangeRates = {
        'AED': 1,      // 迪拉姆
        'CNY': 2.05,   // 人民币
        'USD': 0.27    // 美元
    };
    
    function convertCurrency() {
        const amount = parseFloat(amountInput.value) || 1;
        const fromRate = exchangeRates[fromCurrency.value];
        const toRate = exchangeRates[toCurrency.value];
        
        // 将金额转换为迪拉姆，再转换为目标货币
        const amountInAED = amount / fromRate;
        const result = (amountInAED * toRate).toFixed(2);
        
        convertedAmount.textContent = result;
    }
    
    // 添加事件监听器
    amountInput.addEventListener('input', convertCurrency);
    fromCurrency.addEventListener('change', convertCurrency);
    toCurrency.addEventListener('change', convertCurrency);
    
    // 初始计算
    convertCurrency();
}

// 初始化货币转换器
setupCurrencyConverter();

// 搜索框功能
const searchBox = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');

searchButton.addEventListener('click', function() {
    performSearch();
});

searchBox.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchTerm = searchBox.value.trim();
    if (searchTerm) {
        // 实现搜索逻辑
        console.log(`搜索: ${searchTerm}`);
        alert(`搜索功能将在完整实现中添加: "${searchTerm}"`);
    }
}

// 详情按钮功能
const detailButtons = document.querySelectorAll('.detail-btn');
detailButtons.forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.attraction-card');
        const title = card.querySelector('h3').textContent;
        alert(`${title} 的详细信息将在完整实现中提供`);
    });
});

// 保存行程功能
const saveItineraryBtn = document.querySelector('.save-itinerary');
saveItineraryBtn.addEventListener('click', function() {
    alert('行程已保存！在完整实现中，这将创建一个可导出的行程单。');
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80, // 考虑固定导航栏的高度
                behavior: 'smooth'
            });
        }
    });
});

// 页面加载动画
document.addEventListener('DOMContentLoaded', function() {
    // 为页面元素添加淡入效果
    const fadeElements = document.querySelectorAll('.attraction-card, .food-item, .shopping-item, .tip-item');
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    });
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });
});

// 表单验证
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff0000';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// 页面可见性API - 当页面可见时更新天气
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        updateWeather();
    }
});

// 触摸设备检测
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// 如果是触摸设备，调整一些交互
if (isTouchDevice()) {
    attractionCards.forEach(card => {
        // 为触摸设备移除鼠标悬停效果，改为点击效果
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}