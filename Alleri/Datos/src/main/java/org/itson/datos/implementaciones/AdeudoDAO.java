/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package org.itson.datos.implementaciones;

import org.itson.dominio.entidades.Adeudo;
import org.itson.dominio.entidades.Cita;
import org.itson.datos.interfaces.IAdeudoDAO;
import jakarta.transaction.Transactional;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author erika
 */
@Repository
public interface AdeudoDAO extends JpaRepository<Adeudo, Long>, IAdeudoDAO {

    // Busca el adeudo que pertenece a un psicólogo específico
    @Query("SELECT a FROM Adeudo a JOIN a.citas c WHERE c.psicologo.id = :idPsicologo")
    Optional<Adeudo> findByPsicologoId(@Param("idPsicologo") Long idPsicologo);

    @Override
    @Transactional
    default void actualizarAdeudo(List<Cita> citas, Long idPsicologo) {
        // 1- De-finir el costo de renta por cita
        BigDecimal RENTA_POR_CITA = new BigDecimal("100.00");

        // 2- Calcular el incremento (numero de citas * 100)
        BigDecimal incremento = RENTA_POR_CITA.multiply(new BigDecimal(citas.size()));

        // 3- Buscar si el psicólogo ya tiene un registro de adeudo 
        // Si no existe, creamos uno nuevo.
        Adeudo adeudo = findByPsicologoId(idPsicologo).orElse(new Adeudo());

        if (adeudo.getTotal() == null) {
            adeudo.setTotal(BigDecimal.ZERO);
        }

        // 4- Sumar al total existente 
        BigDecimal totalActual = (adeudo.getTotal() != null) ? adeudo.getTotal() : BigDecimal.ZERO;
        adeudo.setTotal(totalActual.add(incremento));

        // 5- Vincular las nuevas citas al adeudo
        citas.forEach(cita -> cita.setAdeudo(adeudo));

        save(adeudo);
    }

}
