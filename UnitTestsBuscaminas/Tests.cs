using System;
using System.Collections.Generic;
using BuscaminasAPI.Business;
using BuscaminasAPI.Modelos;
using Moq;
using Xunit;
using Xunit.Sdk;

namespace UnitTestsBuscaminas
{
    public class Tests
    {
        public class TokenAlphanumericoTest
        {
            
            [Fact]
            public void getMinesAmountTest()
            {
                //Arrange
                Logic logic = new Logic();
                int altura = 5;
                int anchura = 6;
                string dificultad = "medio";
                //Act
                int mines = logic.getMinesAmount(altura,anchura,dificultad);

                //Assert
                Assert.Equal(6,mines);
            }

            [Fact]
            public void generategGameBoardTest()
            {
                //Arrange
                int partidaMinas = 2;
                int anchura = 3;
                int altura = 3;
                var logicMock = new Mock<Logic>();
                int random = 0;
                logicMock.Setup(x => x.generateRandom(It.IsAny<int>()))
                    .Returns((int value) =>
                    {
                        random++;
                        return random;
                    });

                //Act
                int[] board = logicMock.Object.generateGameBoard(anchura,altura,partidaMinas,2);

                //Assert
                int[] expectedBoard =
                {
                    2, SquareState.mina, 1,
                    SquareState.mina,2,1,
                    1,1,0
                };
                Assert.Equal(expectedBoard, board);
            }

            [Fact]
            public void makeMoveTest()
            {
                //Arrange
                Partida partida = new Partida();
                partida.anchura = 3;
                partida.altura = 3;
                partida.minas = 2;
                partida.tableroPartida =new []
                {
                    2, SquareState.mina, 1,
                    SquareState.mina,2,1,
                    1,1,0
                };
                partida.tableroJugador = new int[partida.anchura * partida.altura];
                Array.Fill(partida.tableroJugador, SquareState.limpio);
                Logic logic = new Logic();

                int fila = 1;
                int columna = 0;

                //Act
                Partida partidaActual = logic.makeMove(partida,fila,columna);

                //Assert
                int[] expectedBoard =
                {
                    -1,-1, -1,
                    SquareState.mina,-1,-1,
                    -1,-1,-1
                };
                Assert.Equal(expectedBoard, partidaActual.tableroJugador);
            }

            [Fact]
            public void makeMoveLoseTest()
            {
                //Arrange
                Partida partida = new Partida();
                partida.anchura = 3;
                partida.altura = 3;
                partida.minas = 2;
                partida.tableroPartida = new[]
                {
                    2, SquareState.mina, 1,
                    SquareState.mina,2,1,
                    1,1,0
                };
                partida.tableroJugador = new int[partida.anchura * partida.altura];
                Array.Fill(partida.tableroJugador, SquareState.limpio);
                Logic logic = new Logic();

                int fila = 1;
                int columna = 0;

                //Act
                Partida partidaActual = logic.makeMove(partida, fila, columna);

                //Assert
                int[] expectedBoard =
                {
                    -1,-1, -1,
                    SquareState.mina,-1,-1,
                    -1,-1,-1
                };
                Assert.Equal(GameState.perdida,partida.estado);
            }


            [Fact]
            public void checkWinTest()
            {
                //Arrange
                Partida partida = new Partida();
                partida.anchura = 3;
                partida.altura = 3;
                partida.minas = 2;
                partida.tableroPartida = new[]
                {
                    2, SquareState.mina, 1,
                    SquareState.mina,2,1,
                    1,1,0
                };
                partida.tableroJugador = new int[]
                {
                    2, -1, 1,
                    -1,2,1,
                    1,1,0
                };
                Logic logic = new Logic();

                int fila = 1;
                int columna = 0;

                //Act
                Partida partidaActual = logic.checkWin(partida);

                //Assert
                Assert.Equal(GameState.Ganada, partida.estado);
            }

                [Fact]
            public void revealSquareTest()
            {
                //Arrange
                Partida partida = new Partida();
                partida.anchura = 3;
                partida.altura = 3;
                partida.minas = 2;
                partida.tableroPartida = new[]
                {
                    2, SquareState.mina, 1,
                    SquareState.mina,2,1,
                    1,1,0
                };
                partida.tableroJugador = new int[partida.anchura * partida.altura];
                Array.Fill(partida.tableroJugador, SquareState.limpio);
                Logic logic = new Logic();

                int fila = 2;
                int columna = 2;

                //Act
                Partida partidaActual = logic.revealSquare(partida, fila, columna);

                //Assert
                int[] expectedBoard =
                {
                    -1,-1, -1,
                    -1,2,1,
                    -1,1,0
                };
                Assert.Equal(expectedBoard, partidaActual.tableroJugador);
            }
        }
    }
}
