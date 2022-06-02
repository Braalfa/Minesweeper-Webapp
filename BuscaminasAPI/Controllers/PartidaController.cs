using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BuscaminasAPI.Business;
using BuscaminasAPI.Modelos;
using MongoDB.Bson;
using MongoDB.Driver;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BuscaminasAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartidaController : ControllerBase
    {

        string databasename = "redesdatabase";
        string modelname = "Partida";
        IMongoCollection<Partida> collection;
        private Logic logic = new Logic();

        public PartidaController(IMongoClient partida)
        {
            var cliente = new MongoClient("mongodb+srv://redesAdmin:redespass@realmcluster.ljdgt.mongodb.net/test");
            var database = cliente.GetDatabase(databasename);
            collection = database.GetCollection<Partida>(modelname);
        }

        // busca la partida activa más reciente
        [HttpGet("buscarActiva")]
        public Partida Get([FromQuery]string email)
        {
            List<Partida> partidas = collection.Find(p => p.email == email && (p.estado==GameState.iniciada || p.estado==GameState.activa)).ToList();
            Partida partida;
            if (partidas.Count == 0)
            {
                partida = new Partida();
                partida.id = -1;
                return partida;
            }
            partida = partidas.Aggregate((p1, p2) => p1.fechaCreacion > p2.fechaCreacion ? p1 : p2);
            return partida;
        }

        // crea la partida con los datos especificados
        [HttpPost("crear")]
        public Partida crearPartida([FromQuery] int altura, [FromQuery] int anchura, [FromQuery] string dificultad, [FromQuery] string email)
        {
            Partida partida = new Partida();
            partida.altura = altura;
            partida.anchura = anchura;
            partida.minas = logic.getMinesAmount(altura, anchura, dificultad);
            partida.fechaCreacion=DateTime.Now;
            partida.email = email;
            partida.tableroPartida = new int[anchura * altura];
            partida.tableroJugador = new int[anchura * altura];
            Array.Fill(partida.tableroJugador,SquareState.limpio);
            partida.estado = GameState.iniciada;
            partida.id= (int) collection.CountDocuments(new BsonDocument());
            collection.InsertOne(partida);
            return partida;
        }

        //realiza el movimiento indicado
        [HttpPut("realizaMovimiento")]
        public Partida makeMove([FromQuery] int fila, [FromQuery] int columna, [FromQuery] int id)
        {
            Partida partida=collection.Find(p => p.id == id).ToList()[0];
            if (partida.estado == GameState.iniciada)
            {
                partida.tableroPartida = logic.generateGameBoard(partida.anchura, partida.altura, partida.minas,
                    columna + fila * partida.anchura);
                partida.estado = GameState.activa;
            }

            partida = logic.makeMove(partida,fila,columna);
            collection.ReplaceOne(p => p.id == partida.id, partida);
            return partida;
        }

        // cambia el estado de la casilla a flag o limpio
        [HttpPut("cambiarEstadoCasilla")]
        public void cambiarEstadoCasilla([FromQuery] int fila, [FromQuery] int columna, [FromQuery] int id, int estado)
        {
            Partida partida = collection.Find(p => p.id == id).ToList()[0];
            partida.tableroJugador[columna + fila*partida.anchura]=estado;
            collection.ReplaceOne(p => p.id == partida.id, partida);
            return;
        }

    }
}
