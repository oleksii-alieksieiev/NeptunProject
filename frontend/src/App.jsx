import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [customers, setCustomers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => {
        console.error("Fehler beim Laden der Kunden:", error);
      });
  }, []);

  const addCustomer = (event) => {
    event.preventDefault();

    fetch("http://localhost:3000/api/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
      }),
    })
      .then((response) => response.json())
      .then((newCustomer) => {
        setCustomers([...customers, newCustomer]);

        setName("");
        setEmail("");
        setPhone("");
      })
      .catch((error) => {
        console.error("Fehler beim Erstellen des Kunden:", error);
      });
  };

  const deleteCustomer = (id) => {
    const confirmed = window.confirm(
      "Möchten Sie diesen Kunden wirklich löschen?",
    );

    if (!confirmed) {
      return;
    }
    fetch(`http://localhost:3000/api/customers/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fehler beim Löschen");
        }

        return response.json();
      })
      .then(() => {
        setCustomers(customers.filter((customer) => customer.id !== id));
      })
      .catch((error) => {
        console.error("Fehler beim Löschen des Kunden:", error);
      });
  };

  const startEditing = (customer) => {
    setEditingId(customer.id);
    setEditName(customer.name);
    setEditEmail(customer.email);
    setEditPhone(customer.phone);
  };

  const updateCustomer = (id) => {
    fetch(`http://localhost:3000/api/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editName,
        email: editEmail,
        phone: editPhone,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fehler beim Aktualisieren");
        }

        return response.json();
      })
      .then(() => {
        setCustomers(
          customers.map((customer) =>
            customer.id === id
              ? {
                  ...customer,
                  name: editName,
                  email: editEmail,
                  phone: editPhone,
                }
              : customer,
          ),
        );

        setEditingId(null);
      })
      .catch((error) => {
        console.error("Fehler beim Aktualisieren des Kunden:", error);
      });
  };

  return (
    <div className="container">
      <h1>Kundenverwaltung</h1>

      <h2>Neuen Kunden hinzufügen</h2>

      <form className="customer-form" onSubmit={addCustomer}>
        <div className="form-group">
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>E-Mail: </label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Telefon: </label>
          <input
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>

        <button className="add-button" type="submit">
          Kunde hinzufügen
        </button>
      </form>

      <h2>Kunden</h2>

      {customers.map((customer) => (
        <div key={customer.id}>
          {editingId === customer.id ? (
            <div>
              <input
                type="text"
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
              />

              <input
                type="email"
                value={editEmail}
                onChange={(event) => setEditEmail(event.target.value)}
              />

              <input
                type="text"
                value={editPhone}
                onChange={(event) => setEditPhone(event.target.value)}
              />

              <button onClick={() => updateCustomer(customer.id)}>
                Speichern
              </button>

              <button onClick={() => setEditingId(null)}>Abbrechen</button>
            </div>
          ) : (
            <div>
              <strong>{customer.name}</strong>
              <p>E-Mail: {customer.email}</p>
              <p>Telefon: {customer.phone}</p>

              <button onClick={() => startEditing(customer)}>Bearbeiten</button>

              <button onClick={() => deleteCustomer(customer.id)}>
                Löschen
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
