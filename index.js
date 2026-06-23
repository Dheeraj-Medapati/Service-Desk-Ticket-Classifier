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
            "https://dheeraj130905-service-desk-ticket-classifier-app.hf.space/call/predict",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    data: [text]
                })
            }
        );

        const eventId = await response.text();

        const resultResponse = await fetch(
            `https://dheeraj130905-service-desk-ticket-classifier-app.hf.space/call/predict/${eventId}`
        );

        const resultText = await resultResponse.text();

        console.log("RAW RESPONSE:", resultText);

        const match = resultText.match(/data:\s*(.*)/);

        if (match) {

            const parsed = JSON.parse(match[1]);

            console.log("PARSED =", parsed);

            resultDiv.innerHTML = JSON.stringify(parsed);

        } else {

            resultDiv.innerHTML = "Prediction failed.";
        }

    } catch (error) {

        resultDiv.innerHTML = "Error connecting to backend.";
        console.error(error);
    }
}