module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            rut: String,
            nombre: String,
            apellido_paterno: String,
            apellido_materno: String,
            fecha_nacimiento: String,
            fecha_contratacion: String,
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