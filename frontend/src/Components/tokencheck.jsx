import React, { useEffect,useState } from "react";

export default function TokenCheck({ children }){
    const [token, setToken] = useState(true);
  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        // Token yoksa yapılacak işlemler (örneğin, kullanıcıyı giriş sayfasına yönlendirme)
        console.log("Token not found!");
      } else {
        try {
          const response = await fetch("http://localhost:3000/auth/get_admin_by_token", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          });

          if (response.status === 401) {
            setToken(false);
            console.log("Invalid token!");
          } else {
            // Token doğruysa yapılacak işlemler
            console.log("Token is valid!");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    checkTokenValidity();
  }, []); // useEffect'in sadece ilk renderda çalışması için boş dependency array kullanıyoruz

  return <>{children}</>; // Token kontrolü tamamlandıktan sonra diğer içeriği render etmek için children kullanıyoruz
};


