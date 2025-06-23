
    const apiKey = "55b1faaf9b02c1e34c9bb9df40533ee8";

    document.getElementById("weatherForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const city = document.getElementById("cityInput").value;
      const result = document.getElementById("weatherResult");

      // Show loading animation with cyberpunk style
      result.innerHTML = '<div class="loading"></div><div style="color: #00ff41; margin-top: 1rem; font-size: 0.9rem;">SCANNING ATMOSPHERIC DATA...</div>';

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`)
        .then(response => {
          if (!response.ok) throw new Error("LOCATION NOT FOUND IN DATABASE");
          return response.json();
        })
        .then(data => {
          const name = data.name;
          const temp = Math.round(data.main.temp);
          const desc = data.weather[0].description;
          const icon = data.weather[0].icon;

          result.innerHTML = `
            <div class="weather-panel">
              <h2>📍 SECTOR: ${name.toUpperCase()}</h2>
              <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" class="weather-icon">
              <div class="temperature">${temp}°C</div>
              <div class="description">${desc.toUpperCase()}</div>
            </div>
          `;
        })
        .catch(error => {
          result.innerHTML = `<div class="error">❌ ERROR: ${error.message}</div>`;
        });
    });

    // Enhanced input animations
    document.getElementById("cityInput").addEventListener("keypress", function(e) {
      if (e.key === 'Enter') {
        this.style.transform = 'scale(0.98)';
        this.style.boxShadow = '0 0 30px rgba(255, 0, 128, 0.8)';
        setTimeout(() => {
          this.style.transform = 'scale(1.02)';
          this.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.5)';
        }, 100);
      }
    });

    // Typing effect for placeholder
    const input = document.getElementById("cityInput");
    const originalPlaceholder = input.placeholder;
    
    input.addEventListener("focus", function() {
      this.placeholder = "";
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < originalPlaceholder.length) {
          this.placeholder += originalPlaceholder.charAt(i);
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);
    });

    input.addEventListener("blur", function() {
      this.placeholder = originalPlaceholder;
    });
  