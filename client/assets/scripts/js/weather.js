document.addEventListener('DOMContentLoaded', function() {
  const image = document.getElementById('moving-image');
  const container = document.querySelector('.background')

  function positionImage() {
      const now = new Date();
      // now.setUTCSeconds(1714091400 + (3600 * 1) )
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      const startOfDayInSeconds = 6 * 3600; // 6 AM
      const endOfDayInSeconds = 18 * 3600; // 6 PM
      const cycleDurationInSeconds = 12 * 3600; // Half day cycle
      
      // Normalize time to range from 0 to 1 over half a day
      let progress;

      if (totalSeconds >= startOfDayInSeconds && totalSeconds <= endOfDayInSeconds) {
        // From 6 AM to 6 PM
        progress = (totalSeconds - startOfDayInSeconds) / cycleDurationInSeconds;
        container.style.backgroundImage = "url('assets/images/sun_bg_2.jpeg')";
        if(!image.src.includes("sun.png")) {
          image.src = "assets/images/sun.png"
        }
        document.querySelector('.title').style.color = "#333"
      } else if (totalSeconds > endOfDayInSeconds) {
        // From 6 PM to 6 AM (next day)
        progress = (totalSeconds - endOfDayInSeconds) / cycleDurationInSeconds;
        container.style.backgroundImage = "url('assets/images/moon_bg.jpeg')";
        if(!image.src.includes("moon.png")) {
          image.src = "assets/images/moon.png"
        }
        document.querySelector('.title').style.color = "white";
      } else {
        // Before 6 AM
        progress = (totalSeconds + (24 * 3600 - endOfDayInSeconds)) / cycleDurationInSeconds;
        container.style.backgroundImage = "url('assets/images/moon_bg.jpeg')";
        if(!image.src.includes("moon.png")) {
          image.src = "assets/images/moon.png"
        }
        document.querySelector('.title').style.color = "white";
      }

      progress = Math.min(1, Math.max(0, progress));

      const maxWidth = container.offsetWidth - image.offsetWidth;
      const maxHeight = container.offsetHeight / 2 - image.offsetHeight / 2;
      
      const x = maxWidth * progress;
      const radians = Math.PI * progress; 
      const y = maxHeight * Math.sin(radians); 

      image.style.left = `${x}px`;
      image.style.top = `${maxHeight - y}px`;

  }

  // window.x = positionImage;
  setInterval(positionImage, 1000); // Update position every second
  positionImage(); // Initial position set
});
