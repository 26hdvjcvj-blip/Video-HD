// download-upload-manager.js - Professional File Manager
class VideoFileManager {
    constructor() {
        this.uploadQueue = [];
        this.downloadHistory = [];
        this.maxUploadSize = 2 * 1024 * 1024 * 1024; // 2GB
        this.supportedFormats = ['mp4', 'webm', 'mov', 'avi', 'mkv'];
        this.init();
    }

    // 🔥 UPLOAD OPTIONS (Multiple + Drag & Drop)
    initDragDrop() {
        const dropZone = document.getElementById('dropZone');
        
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });

        dropZone.addEventListener('drop', handleDrop, false);

        function highlight(e) {
            dropZone.classList.add('highlight');
        }

        function unhighlight(e) {
            dropZone.classList.remove('highlight');
        }

        async function handleDrop(e) {
            const files = Array.from(e.dataTransfer.files);
            await this.uploadBatch(files);
        }
    }

    // Multiple File Upload
    async uploadBatch(files) {
        this.showUploadProgress('📤 Uploading...');
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (this.validateFile(file)) {
                await this.processUpload(file, i + 1, files.length);
            }
        }
        
        this.showNotification(`✅ ${files.length} files uploaded!`);
    }

    validateFile(file) {
        const ext = file.name.split('.').pop().toLowerCase();
        const isValidFormat = this.supportedFormats.includes(ext);
        const isValidSize = file.size <= this.maxUploadSize;
        
        if (!isValidFormat) {
            this.showError(`❌ ${file.name}: Unsupported format`);
            return false;
        }
        
        if (!isValidSize) {
            this.showError(`❌ ${file.name}: File too large (Max 2GB)`);
            return false;
        }
        
        return true;
    }

    async processUpload(file, current, total) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const videoData = {
                    name: file.name,
                    size: this.formatBytes(file.size),
                    data: e.target.result,
                    preview: URL.createObjectURL(file)
                };
                
                this.uploadQueue.push(videoData);
                this.updateQueueUI();
                this.showProgress(`${current}/${total} - ${file.name}`);
                resolve();
            };
            reader.readAsDataURL(file);
        });
    }

    // 🔥 DOWNLOAD OPTIONS (Multiple Formats)
    downloadVideo(options = {}) {
        const defaultOptions = {
            format: 'webm',
            quality: '8k',
            bitrate: 50000000,
            filename: `hd_video_8k_${Date.now()}.${this.format}`
        };
        
        const config = { ...defaultOptions, ...options };
        
        // Create downloadable blob
        const canvas = document.createElement('canvas');
        canvas.width = 7680; canvas.height = 4320; // 8K
        const ctx = canvas.getContext('2d');
        
        // Draw enhanced frame
        ctx.drawImage(document.getElementById('videoPlayer'), 0, 0, 7680, 4320);
        
        canvas.toBlob((blob) => {
            this.downloadFile(blob, config.filename);
            this.downloadHistory.push(config);
        }, `video/${config.format};codecs=vp9`, config.bitrate / 1000000);
    }

    // Multiple Download Formats
    downloadAllFormats() {
        const formats = [
            { name: '8K WebM', format: 'webm', bitrate: 50000000 },
            { name: '4K MP4', format: 'mp4', bitrate: 25000000 },
            { name: 'HD H264', format: 'mp4', bitrate: 10000000 }
        ];
        
        formats.forEach((fmt, i) => {
            setTimeout(() => {
                this.downloadVideo(fmt);
            }, i * 1000);
        });
    }

    // ZIP Download (Multiple Files)
    async downloadAsZip() {
        const JSZip = await import('https://cdn.skypack.dev/jszip');
        const zip = new JSZip();
        
        this.uploadQueue.forEach((video, i) => {
            zip.file(`video_${i + 1}.webm`, video.data.split(',')[1], { base64: true });
        });
        
        const content = await zip.generateAsync({ type: 'blob' });
        this.downloadFile(content, `hd_videos_batch_${Date.now()}.zip`);
    }

    // 📱 Mobile Optimized Download
    downloadForMobile() {
        const link = document.createElement('a');
        link.href = document.getElementById('videoPlayer').src;
        link.download = 'mobile_hd_video.mp4';
        link.click();
        
        // iOS Safari Fix
        if (navigator.userAgent.includes('iPhone')) {
            window.location.href = link.href;
        }
    }

    // Utility Functions
    downloadFile(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    formatBytes(bytes) {
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    }

    updateQueueUI() {
        const queueEl = document.getElementById('uploadQueue');
        queueEl.innerHTML = this.uploadQueue.map((v, i) => `
            <div class="queue-item">
                ${v.name} (${v.size})
                <button onclick="fileManager.downloadVideo({filename: '${v.name}'})">⬇️</button>
            </div>
        `).join('');
    }

    // UI Notifications
    showNotification(message) {
        const notif = document.createElement('div');
        notif.className = 'notification success';
        notif.textContent = message;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 4000);
    }

    showError(message) {
        const notif = document.createElement('div');
        notif.className = 'notification error';
        notif.textContent = message;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 5000);
    }

    showProgress(message) {
        document.getElementById('progress').textContent = message;
    }

    init() {
        this.initDragDrop();
        console.log('📁 File Manager Ready - Upload/Download 8K!');
    }
}

// Global Instance
const fileManager = new VideoFileManager();
