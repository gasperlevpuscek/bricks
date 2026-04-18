function circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}

function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}



function cloudParticles(ctx, particles, x, y, spawn = false) {
    // Spawn a burst
    if (spawn) {
        for (let i = 0; i < 18; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;

            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - Math.random() * 0.8,
                size: 6 + Math.random() * 8,
                life: 1,
                decay: 0.015 + Math.random() * 0.02,
                alpha: 0.7 + Math.random() * 0.3
            });
        }
    }

    // Update + draw all particles
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.vy += 0.03; // tiny gravity
        p.life -= p.decay;

        if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
        }

        ctx.save();
        ctx.globalAlpha = p.life * p.alpha;

        // soft white puff
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, "rgba(255,255,255,0.9)");
        gradient.addColorStop(0.5, "rgba(245,245,245,0.5)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

function fadeInSun(ctx, sunImage, width = 700, height = 700, duration = 900) {
    if (!sunImage.complete) {
        sunImage.onload = function () {
            fadeInSun(ctx, sunImage, width, height, duration);
        };
        return;
    }

    var startTime = null;

    function animate(timestamp) {
        if (startTime === null) {
            startTime = timestamp;
        }

        var progress = Math.min((timestamp - startTime) / duration, 1);
        var drawX = (WIDTH - width) / 2;
        var drawY = (HEIGHT - height) / 4;

        clear();
        ctx.save();
        ctx.globalAlpha = progress;
        ctx.drawImage(sunImage, drawX, drawY, width, height);
        ctx.restore();

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}