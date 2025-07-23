import type { CartItem, Guitar } from "../types";
import { useTranslation } from "react-i18next";

type HeaderProps = {
  cart: CartItem[];
  removeFromCart: (id: Guitar["id"]) => void;
  decreaseQuantity: (id: Guitar["id"]) => void;
  increaseQuantity: (id: Guitar["id"]) => void;
  clearCart: () => void;
  isEmpty: boolean;
  cartTotal: number;
};

export default function Header({
  cart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
  isEmpty,
  cartTotal,
}: HeaderProps) {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between align-items-center">
          {" "}
          {/* Añadido align-items-center para centrado vertical */}
          {/* Columna del Logo (izquierda) */}
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="/img/logo.svg"
                alt={t("logo_alt_text")}
              />
            </a>
          </div>
          {/* Columna para el Selector de Idioma (CENTRO) */}
          <div className="col-md-3 mt-4 mt-md-0 text-center">
            {" "}
            {/* Nueva columna centrada */}
            <label htmlFor="language-selector" className="text-white me-2">
              {t("language_selector_label")}
            </label>
            <select
              id="language-selector"
              className="form-select form-select-sm d-inline-block w-auto" // w-auto y d-inline-block para que ocupe menos espacio y se centre
              value={i18n.language}
              onChange={handleLanguageChange}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
          {/* Columna del Carrito (derecha) */}
          <nav className="col-md-3 mt-5 mt-md-0 d-flex align-items-start justify-content-end">
            {" "}
            {/* Ajustado a col-md-3 */}
            <div className="carrito">
              <img
                className="img-fluid"
                src="/img/carrito.png"
                alt={t("cart_icon_alt_text")}
              />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">{t("cart_empty_message")}</p>
                ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>{t("table_header_image")}</th>
                          <th>{t("table_header_name")}</th>
                          <th>{t("table_header_price")}</th>
                          <th>{t("table_header_quantity")}</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((guitar) => (
                          <tr key={guitar.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${guitar.image}.jpg`}
                                alt={t("guitar_image_alt_text", {
                                  guitarName: guitar.name,
                                })}
                              />
                            </td>
                            <td>{guitar.name}</td>
                            <td className="fw-bold">${guitar.price}</td>
                            <td className="flex align-items-start gap-4">
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => decreaseQuantity(guitar.id)}
                              >
                                -
                              </button>
                              {guitar.quantity}
                              <button
                                type="button"
                                className="btn btn-dark"
                                onClick={() => increaseQuantity(guitar.id)}
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => removeFromCart(guitar.id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-end">
                      {t("cart_total_label")}:{" "}
                      <span className="fw-bold">${cartTotal}</span>
                    </p>
                  </>
                )}

                <button
                  className="btn btn-dark w-100 mt-3 p-2"
                  onClick={clearCart}
                >
                  {t("empty_cart_button")}
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
