import React, { Suspense } from "react";
import { useTranslation } from "react-i18next"; // Aunque no lo usemos directamente para el selector, lo mantendremos para posibles textos futuros en App.tsx

import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { useCart } from "./hooks/useCart";

function App() {
  // Obtenemos 't' e 'i18n' por si App.tsx necesita traducir algo más tarde,
  // pero el selector se manejará en Header.tsx.
  const { t } = useTranslation();

  const {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
  } = useCart();

  return (
    // Envuelve tu contenido principal con Suspense.
    <Suspense fallback={<div>Cargando traducciones...</div>}>
      <>
        {/* Pasamos todas las props existentes al Header.
            No necesitamos pasar `t` o `i18n` a menos que el Header
            necesite acceso directo a esas funciones más allá de lo que `useTranslation` le daría.
            El selector de idioma y su lógica se integrarán directamente en Header.tsx. */}
        <Header
          cart={cart}
          removeFromCart={removeFromCart}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
          clearCart={clearCart}
          isEmpty={isEmpty}
          cartTotal={cartTotal}
        />

        <main className="container-xl mt-5">
          {/* Traduce el título de la colección */}
          <h2 className="text-center">{t("our_collection")}</h2>

          <div className="row mt-5">
            {data.map((guitar) => (
              <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
            ))}
          </div>
        </main>

        <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
            {/* Traduce el texto del footer */}
            <p className="text-white text-center fs-4 mt-4 m-md-0">
              {t("footer_rights_reserved")}
            </p>
          </div>
        </footer>
      </>
    </Suspense>
  );
}

export default App;
