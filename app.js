class LuckyWheel {
    constructor() {
        this.canvas = document.getElementById('wheel');
        this.ctx = this.canvas.getContext('2d');
        this.spinBtn = document.getElementById('spinBtn');
        this.optionInput = document.getElementById('optionInput');
        this.addBtn = document.getElementById('addBtn');
        this.optionsList = document.getElementById('optionsList');
        this.resultModal = document.getElementById('resultModal');
        this.resultText = document.getElementById('resultText');
        this.closeModal = document.getElementById('closeModal');
        this.settingsBtn = document.getElementById('settingsBtn');
        this.settingsModal = document.getElementById('settingsModal');
        this.closeSettings = document.getElementById('closeSettings');
        
        // 預設選項
        this.options = ['選項 1', '選項 2', '選項 3', '選項 4', '選項 5', '選項 6'];
        
        // 轉盤狀態
        this.isSpinning = false;
        this.rotation = 0;
        
        // 顏色配置
        this.colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
            '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
            '#F8B739', '#52B788', '#FF9FF3', '#54A0FF'
        ];
        
        this.init();
    }
    
    init() {
        // 載入儲存的選項
        this.loadOptions();
        
        // 繪製轉盤
        this.drawWheel();
        
        // 顯示選項列表
        this.renderOptionsList();
        
        // 綁定事件
        this.bindEvents();
    }
    
    bindEvents() {
        this.spinBtn.addEventListener('click', () => this.spin());
        this.addBtn.addEventListener('click', () => this.addOption());
        this.optionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addOption();
        });
        this.closeModal.addEventListener('click', () => this.hideResult());
        this.settingsBtn.addEventListener('click', () => this.showSettings());
        this.closeSettings.addEventListener('click', () => this.hideSettings());
        
        // 點擊彈窗背景關閉
        this.settingsModal.addEventListener('click', (e) => {
            if (e.target === this.settingsModal) {
                this.hideSettings();
            }
        });
        this.resultModal.addEventListener('click', (e) => {
            if (e.target === this.resultModal) {
                this.hideResult();
            }
        });
    }
    
    showSettings() {
        this.settingsModal.classList.add('show');
    }
    
    hideSettings() {
        this.settingsModal.classList.remove('show');
    }
    
    drawWheel() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        const numOptions = this.options.length;
        const anglePerOption = (2 * Math.PI) / numOptions;
        
        // 清空畫布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 繪製每個扇形
        for (let i = 0; i < numOptions; i++) {
            const startAngle = this.rotation + i * anglePerOption;
            const endAngle = startAngle + anglePerOption;
            
            // 繪製扇形
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = this.colors[i % this.colors.length];
            this.ctx.fill();
            
            // 繪製邊框
            this.ctx.strokeStyle = '#FFFFFF';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // 繪製文字
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(startAngle + anglePerOption / 2);
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.font = 'bold 20px Arial, Microsoft JhengHei';
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            this.ctx.shadowBlur = 4;
            this.ctx.fillText(this.options[i], radius * 0.65, 10);
            this.ctx.restore();
        }
        
        // 繪製中心圓
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.fill();
        this.ctx.strokeStyle = '#E0E0E0';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }
    
    spin() {
        if (this.isSpinning || this.options.length === 0) return;
        
        this.isSpinning = true;
        this.spinBtn.disabled = true;
        
        // 隨機旋轉圈數和角度
        const minSpins = 5;
        const maxSpins = 8;
        const spins = minSpins + Math.random() * (maxSpins - minSpins);
        const randomAngle = Math.random() * 2 * Math.PI;
        const totalRotation = spins * 2 * Math.PI + randomAngle;
        
        // 動畫參數
        const duration = 4000; // 4秒
        const startTime = Date.now();
        const startRotation = this.rotation;
        
        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用緩出函數
            const easeOut = 1 - Math.pow(1 - progress, 3);
            this.rotation = startRotation + totalRotation * easeOut;
            
            this.drawWheel();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.rotation = this.rotation % (2 * Math.PI);
                this.isSpinning = false;
                this.spinBtn.disabled = false;
                this.showResult();
            }
        };
        
        animate();
    }
    
    showResult() {
        const numOptions = this.options.length;
        const anglePerOption = (2 * Math.PI) / numOptions;
        
        // 計算指針指向的選項（指針在頂部，順時針旋轉）
        // 需要調整角度以匹配指針位置
        let normalizedRotation = (2 * Math.PI - (this.rotation % (2 * Math.PI))) % (2 * Math.PI);
        const selectedIndex = Math.floor(normalizedRotation / anglePerOption) % numOptions;
        
        const selectedOption = this.options[selectedIndex];
        
        this.resultText.textContent = `抽中：${selectedOption}`;
        this.resultModal.classList.add('show');
    }
    
    hideResult() {
        this.resultModal.classList.remove('show');
    }
    
    addOption() {
        const optionText = this.optionInput.value.trim();
        
        if (optionText === '') {
            alert('請輸入選項名稱');
            return;
        }
        
        if (this.options.includes(optionText)) {
            alert('選項已存在');
            return;
        }
        
        this.options.push(optionText);
        this.optionInput.value = '';
        this.saveOptions();
        this.drawWheel();
        this.renderOptionsList();
    }
    
    deleteOption(index) {
        if (this.options.length <= 2) {
            alert('至少需要保留2個選項');
            return;
        }
        
        this.options.splice(index, 1);
        this.saveOptions();
        this.drawWheel();
        this.renderOptionsList();
    }
    
    renderOptionsList() {
        this.optionsList.innerHTML = '';
        
        this.options.forEach((option, index) => {
            const optionTag = document.createElement('div');
            optionTag.className = 'option-tag';
            
            const optionSpan = document.createElement('span');
            optionSpan.textContent = option;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '刪除';
            deleteBtn.addEventListener('click', () => this.deleteOption(index));
            
            optionTag.appendChild(optionSpan);
            optionTag.appendChild(deleteBtn);
            this.optionsList.appendChild(optionTag);
        });
    }
    
    saveOptions() {
        localStorage.setItem('wheelOptions', JSON.stringify(this.options));
    }
    
    loadOptions() {
        const savedOptions = localStorage.getItem('wheelOptions');
        if (savedOptions) {
            try {
                this.options = JSON.parse(savedOptions);
                if (!Array.isArray(this.options) || this.options.length === 0) {
                    this.options = ['選項 1', '選項 2', '選項 3', '選項 4', '選項 5', '選項 6'];
                }
            } catch (e) {
                console.error('載入選項失敗:', e);
            }
        }
    }
}

// 初始化應用
document.addEventListener('DOMContentLoaded', () => {
    new LuckyWheel();
});

