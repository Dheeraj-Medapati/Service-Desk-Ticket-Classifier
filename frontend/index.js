async function predictDepartment() {
    const text = document.getElementById("ticketInput").value;
    const resultDiv = document.getElementById("result");

    if (!text) {
        resultDiv.innerHTML = "Please enter ticket description.";
        return;
    }

    resultDiv.innerHTML = "Predicting...";

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();

        resultDiv.innerHTML = "Your issue is forwarded to  " + data.department +" Department They will reach u soon";

    } catch (error) {
        resultDiv.innerHTML = "Error connecting to backend.";
        console.error(error);
    }
}
