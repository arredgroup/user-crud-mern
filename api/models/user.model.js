module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            id: Number,
            nombre: String,
            apellido: String,
            fecha_nacimiento: String,
            pais: String,
            estado: String
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        //object.id = _id;
        return object;
    });

    const User = mongoose.model("user", schema);
    return User;
};