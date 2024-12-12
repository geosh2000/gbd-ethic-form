import React from "react";

const AvisoPrivacidad = ({ tipoAviso }) => {
  // Arreglo con las opciones de aviso
  const avisos = [
    {
        id: "",
        html: <span>Al continuar navegando y utilizando nuestros servicios, aceptas nuestra <b>Política de Privacidad</b>. Para conocer más detalles sobre cómo recopilamos, utilizamos y protegemos tus datos personales, te invitamos a consultar nuestros <b>Avisos de Privacidad</b> completos en el siguiente enlace:<a href="https://www.grupobd.mx/privacidad-linea-etica" target="_blank" rel="noreferrer">https://www.grupobd.mx/privacidad-linea-etica</a></span>,
    },
    {
      id: "atelier_playa_mujeres_hotel",
      html: <span>Al continuar navegando y utilizando nuestros servicios, aceptas nuestra <b>Política de Privacidad</b>. Para conocer más detalles sobre cómo recopilamos, utilizamos y protegemos tus datos personales, te invitamos a consultar nuestros <b>Avisos de Privacidad</b> completos en el siguiente enlace:<a href="https://www.grupobd.mx/privacidad-linea-etica" target="_blank" rel="noreferrer">https://www.grupobd.mx/privacidad-linea-etica</a></span>,
    },
    {
      id: "atelier_de_hoteles_adh_operadora_de_hoteles",
      html: <span>Al continuar navegando y utilizando nuestros servicios, aceptas nuestra <b>Política de Privacidad</b>. Para conocer más detalles sobre cómo recopilamos, utilizamos y protegemos tus datos personales, te invitamos a consultar nuestros <b>Avisos de Privacidad</b> completos en el siguiente enlace:<a href="https://www.grupobd.mx/privacidad-linea-etica" target="_blank" rel="noreferrer">https://www.grupobd.mx/privacidad-linea-etica</a></span>,
    },
    {
      id: "bdi_renta_de_oficinas",
      html: <span>Al continuar navegando y utilizando nuestros servicios, aceptas nuestra <b>Política de Privacidad</b>. Para conocer más detalles sobre cómo recopilamos, utilizamos y protegemos tus datos personales, te invitamos a consultar nuestros <b>Avisos de Privacidad</b> completos en el siguiente enlace:<a href="https://www.grupobd.mx/privacidad-linea-etica" target="_blank" rel="noreferrer">https://www.grupobd.mx/privacidad-linea-etica</a></span>,
    },
    {
      id: "butik_tiendas_retail",
      html: <span>Al continuar navegando y utilizando nuestros servicios, aceptas nuestra <b>Política de Privacidad</b>. Para conocer más detalles sobre cómo recopilamos, utilizamos y protegemos tus datos personales, te invitamos a consultar nuestros <b>Avisos de Privacidad</b> completos en el siguiente enlace:<a href="https://www.grupobd.mx/privacidad-linea-etica" target="_blank" rel="noreferrer">https://www.grupobd.mx/privacidad-linea-etica</a></span>,
    },
    {
      id: "grupobd_oficinas_centrales",
      html: <span>Al continuar navegando y utilizando nuestros servicios, aceptas nuestra <b>Política de Privacidad</b>. Para conocer más detalles sobre cómo recopilamos, utilizamos y protegemos tus datos personales, te invitamos a consultar nuestros <b>Avisos de Privacidad</b> completos en el siguiente enlace:<a href="https://www.grupobd.mx/privacidad-linea-etica" target="_blank" rel="noreferrer">https://www.grupobd.mx/privacidad-linea-etica</a></span>,
    },
    {
      id: "inspira__unio_services_club_vacacional",
      html: <span>Al continuar navegando y utilizando nuestros servicios, aceptas nuestra <b>Política de Privacidad</b>. Para conocer más detalles sobre cómo recopilamos, utilizamos y protegemos tus datos personales, te invitamos a consultar nuestros <b>Avisos de Privacidad</b> completos en el siguiente enlace:<a href="https://www.grupobd.mx/privacidad-linea-etica" target="_blank" rel="noreferrer">https://www.grupobd.mx/privacidad-linea-etica</a></span>,
    },
    {
      id: "oficina_patrimonial_family_office",
      html: <span>Al continuar navegando y utilizando nuestros servicios, aceptas nuestra <b>Política de Privacidad</b>. Para conocer más detalles sobre cómo recopilamos, utilizamos y protegemos tus datos personales, te invitamos a consultar nuestros <b>Avisos de Privacidad</b> completos en el siguiente enlace:<a href="https://www.grupobd.mx/privacidad-linea-etica" target="_blank" rel="noreferrer">https://www.grupobd.mx/privacidad-linea-etica</a></span>,
    },
    {
      id: "oleo_cancun_playa_hotel",
      html: <span>Al continuar navegando y utilizando nuestros servicios, aceptas nuestra <b>Política de Privacidad</b>. Para conocer más detalles sobre cómo recopilamos, utilizamos y protegemos tus datos personales, te invitamos a consultar nuestros <b>Avisos de Privacidad</b> completos en el siguiente enlace:<a href="https://www.grupobd.mx/privacidad-linea-etica" target="_blank" rel="noreferrer">https://www.grupobd.mx/privacidad-linea-etica</a></span>,
    },
    {
      id: "real_club_club_vacacional",
      html: <span>Al continuar navegando y utilizando nuestros servicios, aceptas nuestra <b>Política de Privacidad</b>. Para conocer más detalles sobre cómo recopilamos, utilizamos y protegemos tus datos personales, te invitamos a consultar nuestros <b>Avisos de Privacidad</b> completos en el siguiente enlace:<a href="https://www.grupobd.mx/privacidad-linea-etica" target="_blank" rel="noreferrer">https://www.grupobd.mx/privacidad-linea-etica</a></span>,
    },

  ];

 

  // Buscar el aviso correspondiente según el tipoAviso
  const avisoSeleccionado = avisos.find((aviso) => aviso.id === tipoAviso);

  return (
    <><div key='privacy'>
      <p className="politica" style={{ fontSize: "10px" }}>
        Estimado Usuario, le informamos que, previo a seguir con el siguiente paso, requerimos de su consentimiento mediante el presente mecanismo de autenticación, a través del cual autoriza y consiente expresamente para que GrupoBD reciba, trate, utilice, transfiera y proteja los Datos Personales Sensibles que le serán solicitados a continuación para los fines descritos en el Aviso de Privacidad que se puede revisar en el presente sitio
        <a href="https://www.grupobd.mx/linea-etica" style={{ fontSize: "10px", color: "blue" }}>https://www.grupobd.mx/linea-etica</a>
        de conformidad con la Ley Federal de Protección de Datos Personales en Posesión de Particulares y su Reglamento.</p>
    </div><div className="form-group">
        <div className="form-check">
          <input
            type="checkbox"
            id="privacy_check"
            className="form-check-input"
            required />
          <label className={`form-check-label privacy-policy-checkbox`} htmlFor="privacy_check">
            Acepto el consentimiento expreso como titular de Datos Personales
          </label>
        </div>
      </div></>

    // <div>
    //   {avisoSeleccionado && avisoSeleccionado !== "" ? (
    //     <div>
    //       <input class="form-check-input me-2" type="checkbox" name="privacy_check" value="" id="privacy_check"></input>
    //       <label class="form-check-label" for="privacy_check">
    //           Acepto aviso de privacidad
    //       </label>
    //       <br></br>
    //       {avisoSeleccionado.html}
    //     </div>
    //   ) : (
    //     <p>Tipo de aviso no encontrado.</p>
    //   )}
    // </div>
  );
};

export default AvisoPrivacidad;