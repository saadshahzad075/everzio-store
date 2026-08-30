export const SPARK_BADGE_MARKUP = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  html, body {
    margin: 0;
    height: 100%;
    background: transparent;
    overflow: hidden;
  }
  .stage {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle at 50% 40%, #1e293b 0%, #0f172a 70%);
    border-radius: 9999px;
    overflow: hidden;
  }
  .drop {
    position: absolute;
    top: -10%;
    width: 2px;
    height: 14%;
    background: linear-gradient(to bottom, rgba(56,189,248,0), rgba(56,189,248,0.85));
    border-radius: 2px;
    animation: fall linear infinite;
  }
  @keyframes fall {
    from { transform: translateY(-20%); opacity: 0; }
    10% { opacity: 1; }
    to { transform: translateY(220%); opacity: 0; }
  }
  .badge-core {
    position: relative;
    z-index: 2;
    width: 46%;
    height: 46%;
    border-radius: 9999px;
    background: radial-gradient(circle, #38bdf8 0%, #0ea5e9 55%, #0369a1 100%);
    box-shadow: 0 0 40px rgba(56,189,248,0.55), inset 0 0 20px rgba(255,255,255,0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 2.4s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  .badge-core svg {
    width: 46%;
    height: 46%;
  }
</style>
</head>
<body>
  <div class="stage" id="stage">
    <div class="badge-core">
      <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2l2.9 6.26L21 9.27l-4.5 4.39L17.8 21 12 17.77 6.2 21l1.3-7.34L3 9.27l6.1-1.01L12 2z"></path>
      </svg>
    </div>
  </div>
  <script>
    (function () {
      var stage = document.getElementById('stage');
      var count = 26;
      for (var i = 0; i < count; i++) {
        var drop = document.createElement('div');
        drop.className = 'drop';
        var left = Math.random() * 100;
        var duration = 1.1 + Math.random() * 1.4;
        var delay = Math.random() * 2;
        drop.style.left = left + '%';
        drop.style.animationDuration = duration + 's';
        drop.style.animationDelay = delay + 's';
        stage.appendChild(drop);
      }
    })();
  </script>
</body>
</html>`;
