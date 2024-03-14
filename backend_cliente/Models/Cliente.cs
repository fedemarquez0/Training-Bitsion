using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace backend_cliente.Models
{
    public class Cliente
    {
        public int idCliente { get; set; }
        public string nombreCompleto { get; set; }
        public string identificacion { get; set; }
        public int edad { get; set; }
        public string genero { get; set; }
        public string estado { get; set; }
        public bool maneja { get; set; }
        public bool usaLentes { get; set; }
        public bool diabetico { get; set; }
        public bool otraEnfermedad { get; set; }
        public string descripOtraEnfermedad { get; set; }

        public Cliente() { }

        public Cliente(int idCliente, string nombreCompleto, string identificacion, int edad, string genero, string estado, bool maneja, bool usaLentes, bool diabetico, bool otraEnfermedad, string descripOtraEnfermedad)
        {
            this.idCliente = idCliente;
            this.nombreCompleto = nombreCompleto;
            this.identificacion = identificacion;
            this.edad = edad;
            this.genero = genero;
            this.estado = estado;
            this.maneja = maneja;
            this.usaLentes = usaLentes;
            this.diabetico = diabetico;
            this.otraEnfermedad = otraEnfermedad;
            this.descripOtraEnfermedad = descripOtraEnfermedad;
        }

        public Cliente(string nombreCompleto, string identificacion, int edad, string genero, string estado, bool maneja, bool usaLentes, bool diabetico, bool otraEnfermedad, string descripOtraEnfermedad)
        {
            this.nombreCompleto = nombreCompleto;
            this.identificacion = identificacion;
            this.edad = edad;
            this.genero = genero;
            this.estado = estado;
            this.maneja = maneja;
            this.usaLentes = usaLentes;
            this.diabetico = diabetico;
            this.otraEnfermedad = otraEnfermedad;
            this.descripOtraEnfermedad = descripOtraEnfermedad;
        }

    }
}