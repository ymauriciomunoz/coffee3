tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    bg: '#F9F8F4',       /* Crema muy claro / Off-white */
                    card: '#FFFFFF',     /* Blanco puro para tarjetas */
                    dark: '#1E2320',     /* Gris oscuro verdoso para textos */
                    green: '#1A4331',    /* Verde esmeralda profundo (Acento principal) */
                    gold: '#C5A059',     /* Dorado/Bronce suave */
                    lightGreen: '#E8F0EC',/* Fondo verde muy suave */
                    border: '#E5E1D8'    /* Color de bordes sutiles */
                }
            },
            fontFamily: {
                sans: ['Outfit', 'sans-serif'],
                serif: ['Lora', 'serif'],
            },
            boxShadow: {
                'soft': '0 10px 40px -10px rgba(0,0,0,0.05)',
                'hover': '0 20px 40px -10px rgba(26, 67, 49, 0.15)',
            }
        }
    }
}
