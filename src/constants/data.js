/*
    {
        text: '',
        answers: {
            A: '',
            B: '',
            C: '',
        }
    }
*/

import ACCEL_AVATAR from './pictures/accel.jpg'
import ASAMI_AVATAR from './pictures/asami.jpg'
import CHITO_AVATAR from './pictures/chito.jpg'
import DANITO_AVATAR from './pictures/danito.jpg'
import GAEN_AVATAR from './pictures/gaen.jpg'
import GOBO_AVATAR from './pictures/gobo.jpg'
import GOIRAD_AVATAR from './pictures/goirad.jpg'
import HARUKA_AVATAR from './pictures/haruka.jpg'
import ISMAEL_AVATAR from './pictures/ismael.jpg'
import JAM_AVATAR from './pictures/jam.jpg'
import JEHU_AVATAR from './pictures/jehu.jpg'
import KAIZA_AVATAR from './pictures/kaiza.jpg'
import KAT_AVATAR from './pictures/kat.jpg'
import LERY_AVATAR from './pictures/lery.jpg'
import NETAROS_AVATAR from './pictures/netaros.jpg'
import RAY_AVATAR from './pictures/ray.jpg'
import XYGE_AVATAR from './pictures/xyge.jpg'
import YAKKARI_AVATAR from './pictures/yakkari.jpg'

const userStats = {
    introversion: 0,
    shyness: 0,
    gaming: 0,
    otakism: 0,
    weeb: 0,
    cinephile: 0,
    music: 0,
    confidence: 0,
    impulsiveness: 0,
    talkative: 0,
    horny: 0
}
const QUESTIONS = [
    {
        text: '¿Prefieres pasar tiempo a solas?',
        answers: [
            { text: 'Sí', points: { introversion: 6 } },
            { text: 'Algunas veces', points: { introversion: 3 } },
            { text: 'No', points: { introversion: 1 } },
        ]
    },
    {
        text: '¿Tomas la iniciativa?',
        answers: [
            { text: 'Siempre que puedo', points: { shyness: 0 } },
            { text: 'Prefiero esperar', points: { shyness: 5, introversion: 2 } },
        ]
    },
    {
        text: '¿Te expresas sin problemas?',
        answers: [
            { text: 'Sí', points: { shyness: 0 } },
            { text: 'Depende del contexto', points: { shyness: 3 } },
            { text: 'Se me dificulta', points: { shyness: 5 } },
        ]
    },
    {
        text: '¿Cuántas consolas posees?',
        answers: [
            { text: 'Ninguna', points: { gaming: 0 } },
            { text: 'Solo juego en mi movil', points: { gaming: 2 } },
            { text: 'Tengo una sola consola', points: { gaming: 2 } },
            { text: 'Soy PC Master Race', points: { gaming: 5 } },
            { text: 'Tengo consolas y juego en PC', points: { gaming: 5 } },
        ]
    },
    {
        text: '¿Qué tan a menudo dedicas parte del tiempo libre a jugar?',
        answers: [
            { text: 'Nunca', points: { gaming: 0 } },
            { text: 'Algunas veces', points: { gaming: 2 } },
            { text: 'Con mucha frecuencia', points: { gaming: 5 } },
        ]
    },
    {
        text: '¿Sabes de videojuegos?',
        answers: [
            { text: 'Sí', points: { gaming: 2 } },
            { text: 'No', points: { gaming: 0 } },
        ]
    },
    {
        text: '¿Ves anime con frecuencia?',
        answers: [
            { text: 'No', points: { otakism: 0 } },
            { text: 'Solo un poco', points: { otakism: 2 } },
            { text: 'Veo anime de temporada', points: { otakism: 5 } },

        ]
    },
    {
        text: '¿Lees manga con frecuencia?',
        answers: [
            { text: 'No', points: { otakism: 0 } },
            { text: 'Solo un poco', points: { otakism: 2 } },
            { text: 'Leo mangas en publicación', points: { otakism: 5 } },

        ]
    },
    {
        text: '¿Consumes contenido Vtuber?',
        answers: [
            { text: 'No, que asco', points: { weeb: 0 } },
            { text: 'Solo un poco', points: { weeb: 4 } },
            { text: 'Sigo a varias vtubers', points: { weeb: 10 } },

        ]
    },
    {
        text: '¿Juegas gachas?',
        answers: [
            { text: 'No', points: { weeb: 0 } },
            { text: 'Solo uno', points: { weeb: 4 } },
            { text: 'Más de uno', points: { weeb: 6 } },

        ]
    },
    {
        text: '¿Tienes letterboxd?',
        answers: [
            { text: 'No', points: { cinephile: 0 } },
            { text: 'Sí', points: { cinephile: 2 } },
        ]
    },
    {
        text: '¿Ves películas con frecuencia?',
        answers: [
            { text: 'Casi nunca', points: { cinephile: 0 } },
            { text: 'Solo un poco', points: { cinephile: 4 } },
            { text: 'Veo muchísimas películas', points: { cinephile: 8 } },
        ]
    }
]

const MEMBERS = [
    { answers: { introversion: 10, shyness:  8, gaming:  2, otakism:  3, weeb:  1, cinephile: 10, music:  5, confidence:  8, talkative: 10, impulsiveness: 10, horny: 10 }, name: 'Danito', picture: DANITO_AVATAR },
    { answers: { introversion:  8, shyness:  6, gaming: 10, otakism:  5, weeb:  1, cinephile:  1, music:  4, confidence:  4, talkative:  4, impulsiveness:  7, horny:  5 }, name: 'Gobo', picture: GOBO_AVATAR },
    { answers: { introversion:  8, shyness:  5, gaming:  8, otakism:  8, weeb:  5, cinephile:  8, music:  5, confidence:  5, talkative:  6, impulsiveness:  1, horny:  2 }, name: 'Jam', picture: JAM_AVATAR },
    { answers: { introversion: 10, shyness: 10, gaming:  8, otakism:  6, weeb:  2, cinephile:  5, music:  7, confidence:  5, talkative:  5, impulsiveness:  1, horny:  2 }, name: 'Goirad', picture: GOIRAD_AVATAR },
]

const VERSION = 'VER. 2024-04-15 13:00'

export { QUESTIONS, MEMBERS, VERSION }