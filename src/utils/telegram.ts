import { TelegramWebApps } from "telegram-webapps-types";

const webApp = (window as any).Telegram.WebApp as TelegramWebApps.WebApp

const telegram = () => {
    return webApp
}

export default telegram