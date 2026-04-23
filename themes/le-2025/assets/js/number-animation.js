document.addEventListener("DOMContentLoaded", function() {
    const countElement = document.getElementById("certificate-count");
    if (!countElement) return;

    const countStr = (countElement.dataset.count || "").trim();
    const abbr = countElement.dataset.abbr || "M";
    const fmt = countElement.dataset.format || "[Number][Abbreviation]";

    if (!/^[\d.]+$/.test(countStr)) return;

    const finalNumber = parseFloat(countStr);
    const decimalPlaces = countStr.includes('.')
        ? (countStr.split('.')[1] || '').length : 0;
    const duration = 1000;

    function formatCount(n) {
        var num = decimalPlaces > 0 ? n.toFixed(decimalPlaces) : Math.round(n).toString();
        return fmt.replace("[Number]", num).replace("[Abbreviation]", abbr);
    }

    countElement.textContent = formatCount(0);

    setTimeout(() => {
        const startTime = performance.now();

        function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = progress * progress;
            countElement.textContent = formatCount(easedProgress * finalNumber);

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        }

        requestAnimationFrame(updateCount);
    }, 50);
});
