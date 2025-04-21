document.addEventListener('DOMContentLoaded', function() {
    const countElement = document.getElementById('certificate-count');
    if (!countElement) return;

    const finalNumber = 600;
    const duration = 1000;

    countElement.textContent = '0M';

    setTimeout(() => {
        const startTime = performance.now();

        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeIn = t => t * t;
            const easedProgress = easeIn(progress);
            const currentNumber = Math.round(easedProgress * finalNumber);
            countElement.textContent = currentNumber + 'M';

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        }

        requestAnimationFrame(updateCount);
    }, 50);
});
