/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package IMappers;

import java.util.List;
import org.itson.dominio.entidades.Pago;
import org.itson.dto.PagoDTO;
import org.mapstruct.Mapper;

/**
 *
 * @author pablo
 */
@Mapper(componentModel = "spring")
public interface PagoMapper {
    public PagoDTO toDTOPago(Pago pago);
    public Pago toPago(PagoDTO pagodto);
    public List<PagoDTO> toDTOPagoList(List<Pago> pago);
    public List<Pago> toPagoList(List<PagoDTO> pagodto);
}
