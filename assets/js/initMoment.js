$(() => {
    const tNode = $("#time");

    function update_localtime() {
        const time = moment()
            .tz(tNode.attr("data-time-zone"))
            .format(tNode.attr("data-time-format"));

        tNode.html(time);
    }

    update_localtime();
    setInterval(update_localtime, 1000);
});
