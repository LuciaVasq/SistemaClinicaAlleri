/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package implementaciones;

import entidades.Adeudo;
import entidades.Cita;
import entidades.Pago;
import interfaces.IAdeudoDAO;
import interfaces.IPagoDAO;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

/**
 *
 * @author erika
 */
@Component
public class PagoDAOImpl implements IPagoDAO {

    @Autowired
    private AdeudoDAO adeudo;

    @Autowired
    @Lazy 
    private PagoDAO pagoRepository;

    @Override
    @Transactional
    public Pago pagarCitas(List<Cita> citas, Long idPsicologo) {
        // 1- buscamos el adeudo del psicologo
        Adeudo adeudoActual = adeudo.findByPsicologoId(idPsicologo)
            .orElseThrow(() -> new RuntimeException("No hay adeudos para este psicólogo"));

        // 2- tomamos el total del adeudo
        BigDecimal totalACobrar = adeudoActual.getTotal();

        // 3- creamos el registro del pago
        Pago nuevoPago = new Pago();
        nuevoPago.setTotal(totalACobrar);
        nuevoPago.setFechaHora(LocalDateTime.now());
        nuevoPago.setConcepto("Liquidación de renta acumulada");
        nuevoPago.setAdeudo(adeudoActual);
        
        // 4- resetear el carrito 
        adeudoActual.setTotal(BigDecimal.ZERO);
        adeudo.save(adeudoActual);

        return pagoRepository.save(nuevoPago);
    }
}