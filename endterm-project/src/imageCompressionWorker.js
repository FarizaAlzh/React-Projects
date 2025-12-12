self.onmessage = (event) => {
    const file = event.data;
    
    const reader = new FileReader();
    
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
  
        // Устанавливаем новый размер изображения для сжатия
        const maxWidth = 800;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;
  
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
  
        // Рисуем изображение на канвасе
        ctx.drawImage(img, 0, 0, width, height);
  
        // Преобразуем канвас обратно в изображение (blob)
        canvas.toBlob((blob) => {
          self.postMessage(blob); // Отправляем обратно сжатое изображение
        }, 'image/jpeg', 0.7); // Компрессия с качеством 70%
      };
      img.src = reader.result;
    };
    
    reader.readAsDataURL(file);
  };
  