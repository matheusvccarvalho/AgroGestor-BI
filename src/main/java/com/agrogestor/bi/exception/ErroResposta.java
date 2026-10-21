package com.agrogestor.bi.exception;

import java.time.LocalDateTime;
import java.util.List;

public class ErroResposta {
    private LocalDateTime timestamp;
    private int status;
    private String mensagem;
    private List<String> erros;

    public ErroResposta(int status, String mensagem, List<String> erros) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.mensagem = mensagem;
        this.erros = erros;
    }

    public LocalDateTime getTimestamp() { return timestamp; }
    public int getStatus() { return status; }
    public String getMensagem() { return mensagem; }
    public List<String> getErros() { return erros; }
}