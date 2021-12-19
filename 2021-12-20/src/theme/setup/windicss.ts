import { resolve } from 'path';
import { defineWindiSetup } from '@slidev/types';

export default defineWindiSetup(() => ({
    extract: {
        include: [resolve(__dirname, '**/*.{vue,ts}')],
    },
    shortcuts: {
        'bg-main': 'bg-white text-[#181818] dark:(bg-[#000] text-[#fff])',
    },
    theme: {
        extend: {
            colors: {
                cpurple: '#590670',
                cpink: '#da79f8',
            },
        },
    },
}));
