<!DOCTYPE html>
<html>
<head>
    <title>8K Video - Upload/Download Pro</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; font-family: system-ui; min-height: 100vh;
        }
        
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        
        /* 🔥 Drag & Drop Zone */
        #dropZone {
            border: 3px dashed #ff6b6b; border-radius: 20px;
            padding: 60px; text-align: center; margin: 20px 0;
            transition: all 0.3s; cursor: pointer;
            background: rgba(255,255,255,0.1);
        }
        #dropZone.highlight { 
            border-color: #4ecdc4; background: rgba(78,205,196,0.2);
            transform: scale(1.02);
        }
        #dropZone:hover { background: rgba(255,107,107,0.2); }
        
        /* Download Buttons */
        .download-grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px; margin: 30px 0;
        }
        .btn {
            padding: 20px 30px; border: none; border-radius: 15px;
            font-size: 16px; font-weight: bold; cursor: pointer;
            transition: all 0.3s; text-decoration: none; display: block;
            text-align: center;
        }
        .btn-primary { background: linear-gradient(45deg, #ff6b6b, #ff8e8e); color: white; }
        .btn-secondary { background: linear-gradient(45deg, #4ecdc4, #44bdad); color: white; }
        .btn:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
        
        /* Queue + Progress */
        #uploadQueue { 
            background: rgba(0,0,0,0.3); border-radius: 15px; 
            padding: 20px; margin: 20px 0; max-height: 300px; overflow-y: auto;
        }
        .queue-item { 
            display: flex; justify-content: space-between; 
            padding: 10px; background: rgba(255,255,255,0.1); 
            margin: 5px 0; border-radius: 10px;
        }
        
        /* Notifications */
        .notification {
            position: fixed; top: 20px; right: 20px; padding: 20px 30px;
            border-radius: 20px; font-weight: bold; z-index: 1000;
            transform: translateX(400px); transition: all 0.4s;
        }
        .notification.show { transform: translateX(0); }
        .success { background: #4ecdc4; }
        .error { background: #ff6b6b; }
        
        #progress { 
            background: rgba(0,0,0,0.5); padding: 15px; 
            border-radius: 10px; text-align: center; font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎬 8K Video Manager</h1>
        
        <!-- 🔥 Upload Zone -->
        <div id="dropZone">
            <h2>📤 Drag & Drop Videos Here</h2>
            <p>Supports MP4, WebM, MOV (Max 2GB)</p>
            <input type="file" id="fileInput" multiple accept="video/*" style="display:none;">
            <button class="btn btn-primary" onclick="document.getElementById('fileInput').click()">
                📁 Select Files
            </button>
        </div>
        
        <!-- 🔥 Download Options -->
        <div class="download-grid">
            <button class="btn btn-primary" onclick="fileManager.downloadVideo()">
                ⬇️ Download 8K WebM
            </button>
            <button class="btn btn-secondary" onclick="fileManager.downloadAllFormats()">
                🌈 All Formats
            </button>
            <button class="btn btn-primary" onclick="fileManager.downloadAsZip()">
                📦 ZIP Batch
            </button>
            <button class="btn btn-secondary" onclick="fileManager.downloadForMobile()">
                📱 Mobile
            </button>
        </div>
        
        <!-- Queue + Progress -->
        <div id="uploadQueue"></div>
        <div id="progress">Ready to upload/download...</div>
    </div>

    <script src="download-upload-manager.js"></script>
    <script>
        // File Input Handler
        document.getElementById('fileInput').addEventListener('change', (e) => {
            fileManager.uploadBatch(Array.from(e.target.files));
        });
        
        // Drag Zone Click
        document.getElementById('dropZone').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
    </script>
</body>
</html>
