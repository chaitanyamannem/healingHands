package in.healinghands.form;

import javax.validation.constraints.Size;

import org.springframework.util.StringUtils;
import org.springframework.validation.Errors;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author chaitanya
 *
 */
public class HealingRequestForm extends BaseForm {

	@Size(min=10, max=100)
	private String title;
	@Size(min=30, max=5000)
	private String description;
	private boolean emergency;
	private boolean underMedication;	
	private String medicationDetails;
	private MultipartFile patientPhoto;


	@Override
	public boolean supports(Class<?> clazz) {
		return HealingRequestForm.class.isAssignableFrom(clazz);
	}

	@Override
	public void validate(Object object, Errors errors) {
		if(!StringUtils.isEmpty(medicationDetails)){
			
			if (medicationDetails.length() > 500) {
				errors.reject(medicationDetails,
						"Medication Details can't be more than 500 characters.");
			}
			
			
		}
		
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

	public MultipartFile getPatientPhoto() {
		return patientPhoto;
	}

	public void setPatientPhoto(MultipartFile patientPhoto) {
		this.patientPhoto = patientPhoto;
	}

//	public String getAuthToken() {
//		return authToken;
//	}
//
//	public void setAuthToken(String authToken) {
//		this.authToken = authToken;
//	}

}
