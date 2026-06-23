async function predictDepartment() {
    const text = document.getElementById("ticketInput").value;
    const resultDiv = document.getElementById("result");

    if (!text) {
        resultDiv.innerHTML = "Please enter ticket description.";
        return;
    }

    resultDiv.innerHTML = "Predicting...";

    try {
        const response = await fetch(
            "https://dheeraj130905-service-desk-ticket-classifier-app.hf.space/predict",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: text
                })
            }
        );

        const data = await response.json();

        resultDiv.innerHTML =
            "Your issue is forwarded to " +
            data.department +
            " Department. They will reach you soon.";

    } catch (error) {
        resultDiv.innerHTML = "Error connecting to backend.";
        console.error(error);
    }
}