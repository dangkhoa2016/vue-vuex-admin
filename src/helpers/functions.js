
import moment from "moment";

export const functions = {
    ext_RenderDate(date) {
        if (!date)
            return '';
        let mm = moment(date);
        return `${mm.format('MMM DD YYYY')}<br/>${mm.format('h:mm:ss a')}`;
    }
}