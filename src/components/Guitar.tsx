import type { Guitar } from "../types";
import { useTranslation } from "react-i18next"; // Importa el hook useTranslation

type GuitarProps = {
  guitar: Guitar;
  addToCart: (item: Guitar) => void;
};

export default function Guitar({ guitar, addToCart }: GuitarProps) {
  // Obtén la función de traducción `t`
  const { t } = useTranslation();

  const { name, image, description, price } = guitar;

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        {/* Traducir el texto alternativo de la imagen de la guitarra */}
        <img
          className="img-fluid"
          src={`/img/${image}.jpg`}
          alt={t("guitar_image_alt_text", { guitarName: name })}
        />
      </div>
      <div className="col-8">
        {/* El nombre de la guitarra (`name`) y la descripción (`description`)
                    normalmente vienen de los datos (base de datos o API), por lo que
                    no se traducen directamente con `t()`. Asumimos que estos ya vienen
                    en el idioma adecuado o que se gestionan por separado si son dinámicos. */}
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">${price}</p>
        <button
          type="button"
          className="btn btn-dark w-100"
          onClick={() => addToCart(guitar)}
        >
          {/* Traducir el texto del botón "Agregar al Carrito" */}
          {t("add_to_cart_button")}
        </button>
      </div>
    </div>
  );
}
