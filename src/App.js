import "./App.css";
import { useState } from "react";

function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { name, email, phone, message } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "post",
      headers: myHeaders,
      redirect: "follow",
      body: JSON.stringify([[name, email, phone, message]]),
    };

    fetch(
      "https://v1.nocodeapi.com/amankanaujia/google_sheets/QERlwGpxZAqWMgwA?tabId=Sheet1",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setData({ ...data, name: "", email: "", phone: "", message: "" });
      })
      .catch((error) => console.log("error", error));

    // try {
    //   const response = await fetch(
    //     "https://v1.nocodeapi.com/amankanaujia/google_sheets/QERlwGpxZAqWMgwA?tabID=Sheet1",
    //     {
    //       method: "POST",
    //       headers: { "content-Type": "application/json" },
    //       body: JSON.stringify([[name, email, phone, message]]),
    //     }
    //   );
    //   await response.json();
    //   setData({ ...data, name: "", email: "", message: "" });
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit} className="flex">
          <h2>Contact Page</h2>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Message"
            name="message"
            value={message}
            onChange={handleChange}
            required
          />
          <button>Save</button>
        </form>
      </div>
    </>
  );
}

export default App;
