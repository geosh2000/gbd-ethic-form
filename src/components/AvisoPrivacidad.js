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
      <strong>AVISO DE PRIVACIDAD</strong> <br></br>
      Sus datos serán tratados conforme a lo establecido por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su Reglamento. Para conocer el Aviso de Privacidad Integral visite <a href="https://www.grupobd.mx/linea-etica/privacidad" style={{ fontSize: "10px", color: "#0076be"}}>https://www.grupobd.mx/linea-etica/privacidad</a> de conformidad con la Ley Federal de Protección de Datos Personales en Posesión de Particulares y su Reglamento.</p>
    </div>
      </>
  );
};

export default AvisoPrivacidad;