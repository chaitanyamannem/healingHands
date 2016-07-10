package in.healinghands.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * @author chaitanya
 *
 */
@Entity
@Table(name = "HealingRequest")
public class HealingRequest {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private String title;
	private String description;
	private boolean emergency;
	private boolean underMedication;
	private String medicationDetails;
	@ManyToOne
	private Member member;
	
	public HealingRequest(String title, String description, boolean emergency,
			boolean underMedication, String medicationDetails, Member member) {
		this.title = title;
		this.description = description;
		this.emergency = emergency;
		this.underMedication = underMedication;
		this.medicationDetails = medicationDetails;
		this.member = member;
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public boolean isEmergency() {
		return emergency;
	}
	public void setEmergency(boolean emergency) {
		this.emergency = emergency;
	}
	public boolean isUnderMedication() {
		return underMedication;
	}
	public void setUnderMedication(boolean underMedication) {
		this.underMedication = underMedication;
	}
	public String getMedicationDetails() {
		return medicationDetails;
	}
	public void setMedicationDetails(String medicationDetails) {
		this.medicationDetails = medicationDetails;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}
	
	

}
