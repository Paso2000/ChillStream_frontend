# Chillstream

**Chillstream** nasce dall’esigenza di un cinema che desidera ampliare la propria offerta, sviluppando una web app che permetta agli utenti di registrarsi, guardare film e interagire tra loro in tempo reale, condividendo pensieri ed emozioni.

Chillstream è un'applicazione web che consente di accedere a un'ampia libreria di contenuti multimediali, selezionare un film e guardarlo in compagnia di altri utenti online.

La sua funzionalità principale è la **riproduzione condivisa** dei film presenti sulla piattaforma, ma l'app offre anche diverse funzionalità aggiuntive, come la **chat in tempo reale** con gli altri spettatori dello stesso film.

Oltre alla riproduzione dei contenuti e alla chat interattiva, Chillstream offre agli utenti registrati la possibilità di **personalizzare la propria esperienza** mediante la creazione di più profili, ciascuno identificato da un *nickname* e un’immagine del profilo.

## Deployment
### **Step 1: Clonare i progetti**

Copiare l'indirizzo HTTPS dei seguenti repository e incollarlo dopo il comando `git clone`:

* [Frontend](https://github.com/Paso2000/ChillStream_frontend)
* [Auth service](https://github.com/Paso2000/ChillStream_auth_service)
* [Content service](https://github.com/GiammaCode/ChillStream_content_service)
* [Interaction service](https://github.com/GiammaCode/ChillStream_interaction_service)

---

### **Step 2: Creazione di una rete Docker condivisa**

Prima di procedere al deployment del sistema, è necessario creare una rete condivisa tra i container. Questo consente ai vari microservizi (Auth, Content, Interaction) di comunicare tra loro in modo efficiente e isolato.

```bash
docker network create shared_network
```

---

### **Step 3: Build e avvio dei servizi**

Per costruire le immagini Docker e avviare i container, eseguire il comando nella directory dove si trova il file `docker-compose.yml`:

```bash
docker-compose up --build
```

---

### **Step 4: Verifica del deployment**

Una volta avviati i container, è possibile verificare lo stato dei servizi con:

```bash
docker ps
```

---

### **Step 5: Accesso all'applicazione**

Dopo l'avvio dei container, il frontend sarà accessibile nel browser all'indirizzo:

```bash
http://localhost:5173
```
