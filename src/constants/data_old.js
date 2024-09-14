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
import KAWI_AVATAR from './pictures/kawi.jpg'
import LERY_AVATAR from './pictures/lery.jpg'
import NETAROS_AVATAR from './pictures/netaros.jpg'
import RAY_AVATAR from './pictures/ray.jpg'
import SHAIA_AVATAR from './pictures/shaia.jpg'
import XYGE_AVATAR from './pictures/xyge.jpg'
import YAKKARI_AVATAR from './pictures/yakkari.jpg'

const MEMBERS = [
    { id:  1, name: 'Danito', picture: DANITO_AVATAR },
    { id:  2, name: 'Accel', picture: ACCEL_AVATAR },
    { id:  3, name: 'Netaros', picture: NETAROS_AVATAR },
    //{ id:  4, name: 'Ray', picture: RAY_AVATAR },
    { id:  5, name: 'Goirad', picture: GOIRAD_AVATAR },
    { id:  6, name: 'Kaiza', picture: KAIZA_AVATAR },
    { id:  7, name: 'Xyge', picture: XYGE_AVATAR },
    { id:  8, name: 'Yakkari', picture: YAKKARI_AVATAR },
    { id:  9, name: 'Lery', picture: LERY_AVATAR },
    { id: 10, name: 'Ismael', picture: ISMAEL_AVATAR },
    { id: 11, name: 'Jam', picture: JAM_AVATAR },
    //{ id: 12, name: 'Jehu', picture: JEHU_AVATAR },
    { id: 13, name: 'Gobo', picture: GOBO_AVATAR },
    { id: 14, name: 'Haruka', picture: HARUKA_AVATAR },
    { id: 15, name: 'Gaen', picture: GAEN_AVATAR },
    { id: 16, name: 'Asami', picture: ASAMI_AVATAR },
    { id: 17, name: 'Chito', picture: CHITO_AVATAR },
    { id: 18, name: 'Kat', picture: KAT_AVATAR },
    { id: 19, name: 'Kawi', picture: KAWI_AVATAR },
    { id: 20, name: 'Shaiapouf', picture: SHAIA_AVATAR }
]

const VERSION = 'VER. 2024-04-15 13:00'
const IS_MOBILE = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false

export { MEMBERS, VERSION, IS_MOBILE }