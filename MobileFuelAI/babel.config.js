module.exports = function (api) {
    api.cache(true);
    return {
        //Needed for utilization of NativeWind.
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
    };
};
