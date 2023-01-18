const htmlEmail = (email, code, url) => {
    return `
    <div style="margin: 0 auto; padding: 1rem 0; -webkit-text-size-adjust: 100%; background-color: #000; color: #fff; max-width: 600px; min-width: 320px">
        <img 
            src="https://res.cloudinary.com/ddds6vljg/image/upload/v1673996516/LOGO_whia3z.png"
            alt="Logo" title="Logo"
            style="height: auto; max-width: 120px; margin: 0 auto; display: block"/>
        <div style="display: block; width: 100%;">
            <div style="min-width: 320px; max-width: 600px; background-color: rgb(12, 12, 12); width: 600px; margin: 0 auto>
                <div stlye:"padding: 25px 10px 10px; color: #fff; line-height: 140px; text-align: center; word-wrap: break-word;">
                    <p style="font-size: 1rem; line-height: 140px; font-family: Cabin, sans-serif; font-size: 26px; font-weight: 600;">
                        Bienvenido a Luroco Tattoo!
                    </p>
                </div>

                <div style="padding: 10px 40px; font-family: arial, helvetica, sans-serif; line-height: 160px; text-align: center;">
                    <p style="font-size: .8rem; line-height: 160px;">
                        Hola ${email}, es un placer que seas parte de nuestro mundo del tatuaje. Por favor clickea el boton de abajo para verificar tu cuenta! Gracias:)                    
                    </p>
                    <p style="font-size: .6rem; line-height: 160px;">
                        Si no sos vos quien se registro en nuestra pagina, solo ignora este mensaje...
                    </p>
                </div>
                
                <div style="padding: 10px;">
                    <a href="${url + code}" target="_blank" style="font-family: arial, helvetica, sans-serif; text-decoration: none; text-align: center; color #fff; background-color: #000; border-radius: 10px; -webkit-border-radius: 4px; -moz-border-radius: 4px; font-size: 14px; padding: 10px 20px; display: block; margin: 0 auto;">
                        Click ACA para verificar tu cuenta :) !
                    </a>
                </div>
            </div>
        </div>
            <div stlye="display: block; width: 100%; background-color: rgb(12, 12, 12);">
                <div style="width: 30%;display: inline-block;margin-left: 5%;">
                    <p style="font-size: 2rem; text-align: center">
                        🌎
                    </p>
                    <p style="font-size: 16px; color: #cacaca; line-height: 160%; text-align: center;">
                        Amigorena 46, Ciudad, Mendoza, Argentina.
                    </p>
                </div>
                <div style="width: 30%;display: inline-block">
                    <p style="font-size: 2rem; text-align: center;">
                        📱
                    </p>
                    <p style="font-size: 16px; color: #cacaca; line-height: 160%; text-align: center">
                        +54 261 559-3565
                    </p>
                </div>
                <div style="width: 30%;display: inline-block">
                    <p style="font-size: 2rem; text-align: center">
                        📩
                    </p>
                    <p style="font-size: 16px; color: #cacaca; line-height: 160%; text-align: center">
                        lurocotattoostudio23@gmail.com
                    </p>
                </div>
            </div>
        </div>
    </div>`
}

module.exports = htmlEmail