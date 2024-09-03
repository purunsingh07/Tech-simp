        // JavaScript for map and routing
        const map = L.map("map").setView([0, 0], 16);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "Satyam Yadav"
        }).addTo(map);

        // Add geocoder (search bar)
        const geocoder = L.Control.geocoder({
            defaultMarkGeocode: false
        }).on('markgeocode', function (e) {
            const latlng = e.geocode.center;
            map.setView(latlng, 16);

            // Get current position
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const { latitude, longitude } = position.coords;
                    addRoute([latitude, longitude], [latlng.lat, latlng.lng]);
                });
            }
        }).addTo(map);

        function addRoute(start, end) {
            L.Routing.control({
                waypoints: [
                    L.latLng(start[0], start[1]),
                    L.latLng(end[0], end[1])
                ],
                lineOptions: {
                    styles: [{ color: '#6FA1EC', weight: 4, dashArray: '4,8' }] // Dotted line
                },
                createMarker: function() { return null; } // No markers for waypoints
            }).addTo(map);
        }

        // Get current position on load
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                map.setView([latitude, longitude], 16);
                L.marker([latitude, longitude]).addTo(map).bindPopup("You are here").openPopup();
            });
        }