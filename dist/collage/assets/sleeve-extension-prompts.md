# Sleeve extensions

Mode: OpenAI built-in image_gen. Original hand images are unchanged; only separate transparent sleeve extensions were generated. WebP quality90, original alpha channel preserved.

## left

Saved public asset: `dist/collage/assets/sleeve-left-extension-v1.webp`
Master: `collage-art/sleeve-left-extension-v1.png`

# Left sleeve continuation

Mode: OpenAI built-in image_gen. Transparent output requested. Reference: `hands-connection.png`. Existing hand assets were not changed.

Saved PNG: `collage-art/sleeve-left-extension-v1.png`.
Saved public asset: `kunaki-demo/dist/collage/assets/sleeve-left-extension-v1.webp` (WebP quality90, original alpha preserved).

## Exact prompt

+Use case: compositing / transparent sleeve continuation. Input image role: STYLE AND TEXTURE REFERENCE ONLY, the existing black-and-white reaching-hands newspaper cutout. Generate ONE NEW SEPARATE TRANSPARENT LAYER: ONLY an extended light knitted woman's sleeve, with absolutely no hand, fingers, skin, person or other objects. The original hands will remain untouched in code. Canvas 2:1 landscape, approximately 1774×887, genuinely transparent RGBA. A long light grey knit / linen sleeve runs horizontally through the whole width, entering the left edge and continuing all the way to the RIGHT image boundary. Crucial registration: at the RIGHT canvas edge the upper fabric contour is y=191/887 (21.5% down), and lower fabric contour y=568/887 (64.0% down). This right edge will overlap and blend into the LEFT cut sleeve edge of the reference image, so match its exact grey tones, small knit texture, archival halftone grain and soft daylight. At the LEFT canvas edge the fabric can be slightly broader and a little higher, naturally extending the upper arm off screen. Keep a broad, restrained silhouette; no cuff opening, no exposed wrist or skin, no rolled cuff, no separate clothing item laid on a surface. It is a continuous tubular fabric continuation worn on an unseen arm. The upper and lower long edges have a very thin irregular warm-white torn paper outline matching the reference, not a thick border. All area outside that sleeve band is genuinely transparent: roughly the upper 20% and lower 30% of canvas must be empty alpha. Preserve an elegant photographic newspaper cutout look, BLACK AND WHITE fabric, no colour tint. No hands, fingers, people, skin, text, letters, logos, background, white rectangle, shadow backdrop, scenery, needles or tools. Output only this independent long sleeve fragment. Do not reproduce or edit the reference's hands.

## right

Saved public asset: `dist/collage/assets/sleeve-right-extension-v1.webp`
Master: `collage-art/sleeve-right-extension-v1.png`

# Right dark jacket sleeve extension

Mode: OpenAI built-in image_gen. The original hand image is a fabric/style reference; the original hand pixels are untouched.

Use case: precise-object-edit / transparent compositing extension. Input image: the attached existing black-and-white newspaper-cutout reaching hands, used ONLY as the style and fabric reference for the dark man's jacket at the RIGHT. Generate ONE NEW SEPARATE FABRIC-ONLY EXTENSION on a truly transparent wide 2:1 canvas about1774x887. Do not reproduce any hands, skin, people or the original central composition. Output only a long charcoal-grey flecked wool jacket sleeve, extending continuously across the full canvas from LEFT edge to RIGHT edge. At the LEFT canvas edge the opaque fabric must begin at y=26percent and end at y=75percent, matching exactly the cut edge at the far right of the source jacket; this edge will join the existing source in code. Toward the RIGHT edge the sleeve can rise very gently and become slightly fuller as it continues offscreen toward the shoulder, with believable smooth fabric folds. Match the reference's BLACK AND WHITE archival photographic halftone printing, slightly rough wool weave, tonal range, lighting and subtle grain; the jacket should be dark but the weave remain visible. Keep a thin warm-white irregular torn-paper outline following the sleeve's TOP and BOTTOM silhouette only. The sleeve must touch both horizontal canvas boundaries, not float as a centered short garment. Keep the whole upper roughly20percent transparent alpha and whole lower roughly20percent transparent; all other space outside the long sleeve genuinely transparent. Do not create a black/white/coloured background or rectangle. NO hands, fingers, palms, wrists, skin, people, buttons, jewellery, cuff opening, text, logos, landscape, table, shadow on a background or objects. This is a supplemental sleeve strip to attach behind the untouched original hands, not a replacement for the original image.
