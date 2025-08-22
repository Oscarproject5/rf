I’m using paper shaders here:
"@paper-design/shaders-react"

Right now, I’m using this setup:

Layering Strategy: Two MeshGradient components stacked

Speed Differential: Primary (0.3) vs. Wireframe (0.2) to create depth

Color Strategy: Black anchors + cyan/aqua accents (#0ea5e9) + strategic white

Opacity Control: Wireframe at 60% for a subtle overlay effect

Container: Black fallback background with overflow: hidden