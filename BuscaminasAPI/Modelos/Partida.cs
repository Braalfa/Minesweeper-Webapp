using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;

namespace BuscaminasAPI.Modelos
{
    public class Partida
    {
        [BsonId]
        [BsonRepresentation(BsonType.Int32)]
        public long id { get; set; }
        public int altura { get; set; }
        public int anchura { get; set; }
        public string email { get; set; }
        public int minas { get; set; }
        public DateTime fechaCreacion { get; set; }
        public int [] tableroPartida { get; set; }
        public int[] tableroJugador { get; set; }
        public string estado { get; set; }

    }
}
