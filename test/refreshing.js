axios.get(url)
    .then(res => {
        const filterData = [];
        var timestamp = {};
        quakes = res.data.features.reduce((array, value) => {
            // if condition is our filter
            if (value.properties.mmi >= 2) {
                // what happens inside the filter is the map
                let time = value.properties.time;
                var utime = new Date(time);

                utime = new Date(utime.toUTCString().slice(0, -4));
                utime = utime.toString().split('GMT')[0];

                time = new Date(time);
                let notificationDate = time;
                var notificationTime = time.getTime();


                time = time.toString().split('GMT')[0];

                value.utime = utime;
                value.properties.time = time;
                value.properties.magnitude = value.properties.magnitude.toFixed(1);
                value.properties.depth = value.properties.depth.toFixed(1) + ' km';
                if (value.properties.mmi >= 2.8) {
                    // AppState.addEventListener('change', this.handleAppStateChange);


                    timestamp['time' + notificationTime] = {
                        date: notificationDate,
                        time: time,
                        magnitude: value.properties.magnitude,
                        location: value.properties.locality

                    };

                }
                array.push(value);

            }

            return array;
        }, filterData)
        this.setState({
            timestamp: timestamp,
            dataSource: quakes,
            isLoading: false,
        })

        this.props.onRefreshData(false);
    });