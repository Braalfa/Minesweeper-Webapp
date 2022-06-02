using System;
using BuscaminasAPI.Modelos;

namespace BuscaminasAPI.Business
{
    public class Logic
    {
        private static readonly Random random = new();

        public int getMinesAmount(int altura, int anchura, string dificultad)
        {
            int squares = altura * anchura;
            if (dificultad == Difficulty.profesional) return (int)(squares * 0.4);
            if (dificultad == Difficulty.medio) return (int)(squares * 0.2);
            if (dificultad == Difficulty.dificil) return (int)(squares * 0.3);
            return (int)(squares * 0.1);
        }

        public virtual int generateRandom( int upperValue)
        {
            return random.Next(upperValue);
        }
        public int[] generateGameBoard(int anchura, int altura, int partidaMinas, int move)
        {
            int[] board = new int[altura * anchura];
            int n = 0;
            while (n < partidaMinas)
            {
                int squareIndex = generateRandom(altura * anchura);
                if (board[squareIndex] != SquareState.mina && squareIndex != move)
                {
                    board[squareIndex] = SquareState.mina;
                    for (int j = -1; j <= 1; j++)
                    {
                        for (int i = -1; i <= 1; i++)
                        {
                            int adjacentsquare = squareIndex + i + anchura * j;
                            if (adjacentsquare >= 0 && adjacentsquare < anchura * altura &&
                                adjacentsquare != squareIndex && board[adjacentsquare] != SquareState.mina &&
                                !((i == -1 && squareIndex % anchura == 0) || (i == 1 &&
                                                                              squareIndex % anchura == anchura - 1)))
                            {
                                board[adjacentsquare]++;
                            }
                        }
                    }

                    n++;
                }
            }

            return board;
        }

        public Partida makeMove(Partida partida, int fila, int columna)
        {
            int square = columna + fila * partida.anchura;

            if (partida.tableroPartida[square] == SquareState.mina)
            {
                partida.estado = GameState.perdida;
                partida.tableroJugador[square] = partida.tableroPartida[square];
            }
            else
            {
                partida = revealSquare(partida, fila, columna);
                partida = checkWin(partida);
            }
            return partida;
        }

        public Partida checkWin(Partida partida)
        {
            for (int i = 0; i < partida.tableroPartida.Length; i++)
            {
                if (partida.tableroPartida[i] != partida.tableroJugador[i] &&
                    partida.tableroPartida[i] != SquareState.mina)
                {
                    return partida;
                }
            }
            partida.estado = GameState.Ganada;
            return partida;
        }

        public Partida revealSquare(Partida partida, int fila, int columna)
        {
            int square = columna + fila * partida.anchura;
            partida.tableroJugador[square] = partida.tableroPartida[square];
            if (partida.tableroPartida[square] == 0)
            {
                for (int j = -1; j <= 1; j++)
                {
                    for (int i = -1; i <= 1; i++)
                    {
                        int adjacentsquare = square + i + partida.anchura * j;
                        int iColumna = i + columna;
                        int jFila = j + fila;
                        if (iColumna >= 0 && iColumna < partida.anchura &&
                            adjacentsquare != square && jFila >= 0 && jFila < partida.altura &&
                            partida.tableroJugador[adjacentsquare] != partida.tableroPartida[adjacentsquare])
                        {
                            partida = revealSquare(partida, jFila, iColumna);
                        }
                    }
                }
            }
            return partida;
        }
    }
}
