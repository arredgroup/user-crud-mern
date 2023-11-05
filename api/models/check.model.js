module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            rut: String,
            fecha: String,
            hora: String,
            tipo: Number,
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        //object.id = _id;
        return object;
    });

    const Check = mongoose.model("check", schema);
    return Check;
};