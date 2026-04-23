document.addEventListener('DOMContentLoaded', () => {
    // File Upload Elements
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    const fileNameDisplay = document.getElementById('file-name-display');
    const predictBtn = document.getElementById('predict-btn');
    const mainForm = document.getElementById('main-form');
    
    // Support elements available across pages
    const loadingOverlay = document.getElementById('loading-overlay');

    if (dropZone && fileInput && browseBtn) {
        // Handle browse button click
        browseBtn.addEventListener('click', () => {
            fileInput.click();
        });

        // Handle file drop events
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.style.borderColor = 'var(--primary-green)';
                dropZone.style.background = '#f0fdf4';
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => {
                dropZone.style.borderColor = 'var(--border-color)';
                dropZone.style.background = 'var(--bg-light)';
            }, false);
        });

        dropZone.addEventListener('drop', (e) => {
            let dt = e.dataTransfer;
            let files = dt.files;
            handleFiles(files);
        });

        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });

        function handleFiles(files) {
            if (files.length > 0) {
                const file = files[0];
                const validTypes = ['image/jpeg', 'image/png', 'image/tiff'];
                
                if (validTypes.includes(file.type)) {
                    fileNameDisplay.textContent = `Selected: ${file.name}`;
                    fileNameDisplay.style.color = 'var(--primary-green)';
                    
                    // Assign file to input if dropped
                    if (fileInput.files !== files) {
                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(file);
                        fileInput.files = dataTransfer.files;
                    }

                    // Show submit button
                    predictBtn.style.display = 'block';
                } else {
                    fileNameDisplay.textContent = 'Invalid file type. Please upload JPG, PNG, or TIFF.';
                    fileNameDisplay.style.color = 'var(--danger-red)';
                    predictBtn.style.display = 'none';
                    fileInput.value = ''; // clear
                }
            }
        }
    }

    if (mainForm) {
        mainForm.addEventListener('submit', (e) => {
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
            }
        });
    }
});
