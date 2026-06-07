const projects = {
      trek: {
        title: "Trek",
        desc: "Android fitness tracker built with Kotlin and Firebase. Real-time GPS run tracking, route mapping, step counting, and calorie tracking. I owned the full backend, Firestore schema design, Firebase Auth, and Docker infrastructure. Built as a team project at CSU San Marcos.",
        tags: ["Kotlin", "Firebase", "Firestore", "Google Maps API", "Docker", "Android"],
        link: "https://github.com/ClaytonFrandeen/Trekapp/tree/main"
      },
      avian: {
        title: "Hallowed Feathers",
        desc: "Dark bird-themed souls-like RPG built in Unity. Fight through waves of enemies, rest at ancient nests, level up, and face a brutal avian boss. I built the core gameplay loop — full combat system, hit detection, health and stamina, leveling, enemy AI, and nest respawn mechanics. 4-person team project at CSU San Marcos.",
        tags: ["Unity", "C#", "Git", "Game Dev", "Souls-like"],
        link: "https://github.com/ClaytonFrandeen/hollow-feathers"
      },
      snail: {
        title: "S.N.A.I.L",
        desc: "Autonomous robot car that detects and chases a soccer ball in real time using computer vision. I built the full CV pipeline, collected and labeled training data, trained the YOLO model from scratch, and integrated it into the live camera feed connected to ROS2 navigation nodes. 4-person team project at CSU San Marcos.",
        tags: ["Python", "YOLO", "ROS2", "Docker", "Computer Vision"],
        link: "https://github.com/ClaytonFrandeen/S.N.A.I.L"
      },
      portfolio: {
        title: "Portfolio Website",
        desc: "This site. Built with vanilla HTML, CSS, and JS with a cassette futurism aesthetic. Deployed on GitHub Pages.",
        tags: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
        link: "https://claytonfrandeen.github.io"
      },
      unity: {
        title: "Unity Game (WIP)",
        desc: "A personal game project currently in development using Unity. More details coming soon.",
        tags: ["Unity", "C#", "Game Dev"],
        link: "#"
      },
      placeholder: {
        title: "Next Project",
        desc: "Slot reserved for the next build. Check back soon.",
        tags: ["TBD"],
        link: "#"
      }
    };
 
    function openProject(id) {
      const p = projects[id];
      document.getElementById('panelTitle').textContent = p.title;
      document.getElementById('panelDesc').textContent = p.desc;
      document.getElementById('panelLink').href = p.link;
 
      const tagsEl = document.getElementById('panelTags');
      tagsEl.innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
 
      document.getElementById('projectPanel').classList.add('active');
      document.getElementById('nowPlaying').innerHTML =
        `▶ NOW PLAYING: ${p.title.toUpperCase()} <span>█</span>`;
    }
 
    function closeProject() {
      document.getElementById('projectPanel').classList.remove('active');
      document.getElementById('nowPlaying').innerHTML = '';
    }